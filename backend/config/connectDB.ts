import mongoose, { Connection } from 'mongoose'

const connectDB = async () => {
   try {
      const DB_CONNECTION = process.env.MONGO_CONNECTION_STRING || ''
      mongoose.set('strictQuery', true)
      const connection = await mongoose.connect(DB_CONNECTION)
      console.log(`MongoDB connected: ${connection.connection.host}`)
   } catch (error) {
      console.error(error)
      process.exit(1)
   }
}

export default connectDB
