import { Model, ObjectId } from 'mongoose'

export interface IChatSchema {
   participants: string[] // ref to users
   messages: {
      _id: ObjectId | string
      createdAt: string
      updatedAt: string
      userId: ObjectId // ez is legyen ref
      isRead?: boolean
      message: string
      image: string
   }[]
}

export interface IChatModel extends Model<IChatSchema> {}
