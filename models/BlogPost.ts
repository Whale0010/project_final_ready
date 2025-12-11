import mongoose from "mongoose"

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  excerpt: String,
  image: String,
  category: String,
  published: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      author: String,
      text: String,
      createdAt: Date,
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)
