import mongoose from "mongoose"

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  location: String,
  capacity: Number,
  registrations: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      registeredAt: Date,
    },
  ],
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Event || mongoose.model("Event", EventSchema)
