import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  // placeholder: authenticated member chat entrypoint
  try {
    const body = await req.json()
    // in production: verify session, persist message, broadcast via socket
    return NextResponse.json({ ok: true, received: body })
  } catch (e) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
}
