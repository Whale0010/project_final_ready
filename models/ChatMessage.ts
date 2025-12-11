import mongoose from "mongoose"

const ChatMessageSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  message: String,
  response: String,
  from: {
    type: String,
    enum: ["user", "assistant"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  feedback: {
    type: String,
    enum: ["positive", "negative", null],
  },
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.ChatMessage || mongoose.model("ChatMessage", ChatMessageSchema)
