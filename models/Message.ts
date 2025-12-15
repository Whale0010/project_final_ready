import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
