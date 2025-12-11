import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import ChatMessage from "@/models/ChatMessage"

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY
const HF_MODEL = "microsoft/DialoGPT-medium"

async function getChatbotResponse(message: string, history: any[]) {
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      headers: { Authorization: `Bearer ${HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify({
        inputs: {
          text: message,
          past_user_inputs: history.map((m) => m.message),
          generated_responses: history.map((m) => m.response),
        },
      }),
    })

    const result = await response.json()
    return result.generated_text || "Unable to generate response"
  } catch (error) {
    console.error("Hugging Face API error:", error)
    return "Je suis momentanément indisponible. Veuillez réessayer plus tard."
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId, history = [] } = body

    if (!message || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const response = await getChatbotResponse(message, history)

    await dbConnect()
    await ChatMessage.create({
      sessionId,
      message,
      response,
      from: "user",
    })

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
