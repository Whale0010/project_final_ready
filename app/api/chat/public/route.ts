import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { queryDeepSeek } from '../../../lib/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { question } = (await req.json()) as { question?: string }
    const clientIp = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    const answer = await queryDeepSeek(question ?? '', clientIp)
    return NextResponse.json({ answer })
  } catch (e) {
    console.error('public chat error', e)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
