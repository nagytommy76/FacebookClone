import { Schema, model, Types } from 'mongoose'
import { IChatModel, IChatSchema } from './Types'

const ChatSchema = new Schema<IChatSchema, IChatModel>(
   {
      participants: [
         {
            type: Types.ObjectId,
            ref: 'User',
         },
      ],
      messages: [
         {
            createdAt: { type: Date, default: new Date() },
            updatedAt: { type: Date, default: new Date() },
            userId: { type: Types.ObjectId, ref: 'User' },
            message: { type: String },
            image: { type: String },
         },
      ],
   },
   { timestamps: true }
)

export const ChatModel = model<IChatSchema, IChatModel>('Chat', ChatSchema)
