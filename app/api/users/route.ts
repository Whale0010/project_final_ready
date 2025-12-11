import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const users = await User.find({}).select("-password")

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
