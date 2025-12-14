import { NextApiRequest, NextApiResponse } from 'next'
import { initSocket } from '@/lib/socket'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await initSocket(res)
    res.status(200).end()
  } catch (err) {
    console.error('socket init error', err)
    res.status(500).json({ error: 'Socket init failed' })
  }
}
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as IOServer } from 'socket.io'
import dbConnect from '@/lib/mongodb'
import Message from '@/models/Message'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) return res.status(500).end()

  // @ts-ignore attach once
  if (!res.socket.server.io) {
    // create new socket.io server
    const io = new IOServer(res.socket.server as any, {
      path: '/api/socketio',
      cors: { origin: '*' },
    })

    io.on('connection', (socket) => {
      socket.on('join', async (roomId: string) => {
        socket.join(roomId)
        try {
          await dbConnect()
          const msgs = await Message.find({ roomId }).sort({ createdAt: 1 }).lean()
          socket.emit('history', msgs)
        } catch (e) {
          console.error('socket history error', e)
        }
      })

      socket.on('message', async (payload: { roomId: string; senderId: string; content: string }) => {
        const { roomId, senderId, content } = payload
        if (!roomId || !senderId || !content) return
        try {
          await dbConnect()
          const msg = await Message.create({ roomId, senderId, content })
          io.to(roomId).emit('message', msg)
        } catch (e) {
          console.error('socket save error', e)
        }
      })
    })

    // @ts-ignore attach
    res.socket.server.io = io
  }

  res.end()
}
