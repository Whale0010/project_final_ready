import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: wire to real registration logic (lib/auth)
    return NextResponse.json({ ok: true, received: body });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }
}


/* auto-added handlers */
export async function GET() { return new Response('ok', { status: 200 }); }