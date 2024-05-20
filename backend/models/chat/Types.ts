import { Model, ObjectId } from 'mongoose'
import type { ILike } from '@/controllers/Base/Types'

export interface IMessage {
   _id?: ObjectId | string
   createdAt?: Date | string
   updatedAt?: Date | string
   receiverUserId: string // ez is legyen ref
   isRead?: boolean
   message: string
   image?: string
   reaction: ILike[]
}
export interface IChatSchema {
   participants: { participant: string | ObjectId; _id: string | ObjectId }[] // ref to users
   messages: IMessage[]
}

export interface IChatModel extends Model<IChatSchema> {}
