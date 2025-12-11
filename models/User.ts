import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email"],
  },
  phone: {
    type: String,
    match: [/^(?:(?:\+|00)212|0)[5-7]\d{8}$/, "Please provide a valid Moroccan phone number"],
  },
  cin: {
    type: String,
    match: [/^[A-Z]{1,2}[0-9]{6}$/, "Please provide a valid CIN"],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "member", "visitor"],
    default: "visitor",
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
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

export default mongoose.models.User || mongoose.model("User", UserSchema)
