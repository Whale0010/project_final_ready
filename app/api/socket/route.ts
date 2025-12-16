import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { initSocket } from '@/lib/socket'

export async function GET(req: NextRequest) {
  try {
    // init socket using response-like object isn't possible here, so return 204
    // Clients should call the pages API `/api/socketio` to initialize server-side socket on dev
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('socket init app route error', err)
    return NextResponse.json({ error: 'Socket init failed' }, { status: 500 })
  }
}
