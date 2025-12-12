import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ message: 'deepseek API placeholder' })
}


/* auto-added handlers */
export async function GET() { return new Response('ok', { status: 200 }); }
export async function POST() { return new Response('ok', { status: 200 }); }