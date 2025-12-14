import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'deepseek API placeholder' })
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    // placeholder: normally forward to DeepSeek here
    return NextResponse.json({ ok: true, received: body })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}