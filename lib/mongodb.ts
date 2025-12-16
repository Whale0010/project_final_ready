import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

declare global {
  // eslint-disable-next-line no-var
  var __mongoose_global__: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  } | undefined
}

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set; database operations will fail until provided.')
}

const cached = global.__mongoose_global__ || { conn: null, promise: null }

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // use the new URL parser and topology by default via mongoose v6+ settings
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => mongooseInstance)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  global.__mongoose_global__ = cached

  return cached.conn!
}

export default dbConnect
