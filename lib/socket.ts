import { Server as IOServer } from 'socket.io'
import { NextApiResponse } from 'next'
import dbConnect from './mongodb'
import ChatMessage from '@/models/ChatMessage'

export type SocketServer = IOServer & { __initialized?: boolean }

export async function initSocket(res: NextApiResponse) {
  // attach socket.io server to the Next.js response socket
  // @ts-ignore - augmenting server object
  if ((res.socket as any).server?.io && (res.socket as any).server.io.__initialized) {
    return (res.socket as any).server.io as SocketServer
  }

  await dbConnect()

  // create new server
  // @ts-ignore
  const io: SocketServer = new IOServer((res.socket as any).server, {
    path: '/api/socket',
    cors: { origin: '*' },
  }) as SocketServer

  io.__initialized = true

  io.on('connection', (socket) => {
    socket.on('join', async (roomId: string) => {
      socket.join(roomId)
      const history = await ChatMessage.find({ sessionId: roomId }).sort({ timestamp: 1 }).lean()
      socket.emit('history', history)
    })

    socket.on('message', async (payload: { sessionId: string; userId?: string; message: string }) => {
      try {
        if (!payload?.sessionId || !payload?.message) return
        const doc = await ChatMessage.create({ sessionId: payload.sessionId, message: payload.message, from: 'user', userId: payload.userId })
        io.to(payload.sessionId).emit('message', doc)
      } catch (err) {
        console.error('socket message error', err)
      }
    })
  })

  // @ts-ignore
  ;(res.socket as any).server.io = io

  return io
}
