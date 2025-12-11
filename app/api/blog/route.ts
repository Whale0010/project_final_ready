import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const body = await request.json()

    const post = await BlogPost.create({
      ...body,
      author: (session.user as any).id,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
