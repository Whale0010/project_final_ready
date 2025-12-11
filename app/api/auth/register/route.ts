import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { registerSchema } from "@/lib/validators"
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const result = registerSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const existingUser = await User.findOne({ email: result.data.email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    const user = await User.create({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      password: hashedPassword,
      role: "member",
    })

    // Send verification email
    await sendVerificationEmail(user.email, user._id.toString())

    return NextResponse.json({ message: "Registration successful. Please verify your email." }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
