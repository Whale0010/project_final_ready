import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Message from '@/models/Message'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  try {
    // verify JWT session
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = (await req.json()) as { roomId?: number; content?: string }
    const { roomId, content } = body
    if (!roomId || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const userId = String(token.sub)
    await dbConnect()
    const message = await Message.create({ content, roomId: String(roomId), senderId: userId })

    // Optionally: broadcast via socket.io (client should connect to /api/socket)
    try {
      // @ts-ignore
      try {
        // emit via socket.io attached to server
        // @ts-ignore
        const io = (global as any).io || (res.socket as any)?.server?.io
        if (io) io.to(String(roomId)).emit('message', message)
      } catch (e) {
        console.warn('socket emit failed', e)
      }
    } catch (e) {
      console.warn('socket emit failed', e)
    }

    return NextResponse.json({ ok: true, message })
  } catch (e) {
    console.error('members chat error', e)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
}
