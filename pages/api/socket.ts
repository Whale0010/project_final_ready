import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'
import prisma from '../../lib/prisma'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  if (!res.socket.server.io) {
    // adapt to Next.js server
    const io = new Server(res.socket.server as any)
    // attach
    // @ts-ignore
    res.socket.server.io = io

    io.on('connection', async (socket) => {
      try {
        // join room event
        socket.on('join', async (roomId: number) => {
          socket.join(String(roomId))
          const messages = await prisma.message.findMany({ where: { roomId }, orderBy: { createdAt: 'asc' } })
          socket.emit('history', messages)
        })

        socket.on('message', async (payload: { roomId: number; senderId: number; content: string }) => {
          const { roomId, senderId, content } = payload
          if (!content || !roomId || !senderId) return
          const msg = await prisma.message.create({ data: { content, roomId, senderId } })
          io.to(String(roomId)).emit('message', msg)
        })

        socket.on('disconnect', () => {
          // noop for now
        })
      } catch (err) {
        console.error('socket error', err)
      }
    })
  }
  res.end()
}
