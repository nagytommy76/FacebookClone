import { Model, ObjectId } from 'mongoose'

export interface IMessage {
   _id?: ObjectId | string
   createdAt?: Date | string
   updatedAt?: Date | string
   receiverUserId: string // ez is legyen ref
   isRead?: boolean
   message: string
   image?: string
}
export interface IChatSchema {
   participants: { participant: string | ObjectId; _id: string | ObjectId }[] // ref to users
   messages: IMessage[]
}

export interface IChatModel extends Model<IChatSchema> {}
