import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [200, "Title cannot be more than 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  category: {
    type: String,
    enum: ["environment", "digitalization", "both"],
    default: "both",
  },
  status: {
    type: String,
    enum: ["planning", "active", "completed"],
    default: "planning",
  },
  images: [String],
  startDate: Date,
  endDate: Date,
  budget: Number,
  partners: [String],
  impactMetrics: mongoose.Schema.Types.Mixed,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
