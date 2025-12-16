import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { loginSchema } from '@/lib/validators'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, any>
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })

    const { email, password } = parsed.data

    await dbConnect()
    const user = await User.findOne({ email }).select('+password').lean()
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const isValid = await bcrypt.compare(password, (user as any).password)
    if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    return NextResponse.json({ ok: true, user: { id: (user as any)._id.toString(), email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    console.error('login error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
