import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { registerSchema } from '@/lib/validators'

const PASSWORD_MIN = 8

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, any>

    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, phone, password } = parsed.data

    if (password.length < PASSWORD_MIN) return NextResponse.json({ error: 'Password too short' }, { status: 400 })

    await dbConnect()

    const existing = await User.findOne({ email }).lean()
    if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 409 })

    const hashed = await bcrypt.hash(password, 10)

    const userDoc = await User.create({
      name,
      email,
      phone,
      password: hashed,
      role: 'member',
    } as any)

    return NextResponse.json({ ok: true, id: userDoc._id.toString() })
  } catch (err) {
    console.error('register error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
 
