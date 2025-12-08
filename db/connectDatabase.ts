import mongoose from 'mongoose'

// Mongo compass cluster에 접속
const connectDatabase = async () => {
  try {
    if (process.env.MONGO_URI) {
      if (mongoose.connection.readyState === 1) return
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log(`MongoDB Connected ${conn.connection.host}`)
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDatabase
