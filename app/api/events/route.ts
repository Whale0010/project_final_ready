import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Event from '@/models/Event'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const events = await Event.find({}).sort({ startDate: -1 }).lean()
    return NextResponse.json(events)
  } catch (error) {
    console.error('events GET error', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as { title?: string; description?: string; startDate?: string }
    if (!body.title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })

    await dbConnect()

    const createdBy = new mongoose.Types.ObjectId((session.user as any).id)
    const event = await Event.create({ title: body.title, description: body.description ?? null, startDate: body.startDate ? new Date(body.startDate) : null, createdBy })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('events POST error', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
