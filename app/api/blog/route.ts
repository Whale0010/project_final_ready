import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('blog GET error', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as { title?: string; content?: string; published?: boolean }
    if (!body.title || !body.content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    await dbConnect()
    const authorId = new mongoose.Types.ObjectId((session.user as any).id)
    const post = await BlogPost.create({ title: body.title, content: body.content, published: !!body.published, author: authorId } as any)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('blog POST error', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
