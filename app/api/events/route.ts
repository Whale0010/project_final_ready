import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Event from "@/models/Event"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const events = await Event.find({}).sort({ startDate: -1 })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
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

    const event = await Event.create({
      ...body,
      createdBy: (session.user as any).id,
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
