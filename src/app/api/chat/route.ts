import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, route: 'chat' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, body });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }
}
