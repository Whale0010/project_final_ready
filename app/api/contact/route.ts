import { type NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validators"
import { sendContactReply } from "@/lib/email"
import dbConnect from "@/lib/mongodb"
import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
})

const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactSchema)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    await dbConnect()
    await ContactMessage.create(result.data)

    await sendContactReply(result.data.email, "Merci pour votre message. Nous vous répondrons bientôt.")

    return NextResponse.json({ message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
