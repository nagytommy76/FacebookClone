import { Schema, model, Types } from 'mongoose'
import { IChatModel, IChatSchema } from './Types'

import { likesSchemaObject } from '../posts/posts'

const ChatSchema = new Schema<IChatSchema, IChatModel>(
   {
      participants: { type: [{ participant: { type: Types.ObjectId, ref: 'User' } }] },
      messages: [
         {
            createdAt: { type: Date, default: new Date() },
            updatedAt: { type: Date, default: new Date() },
            isRead: { type: Boolean, default: false },
            receiverUserId: { type: Types.ObjectId, ref: 'User' },
            message: { type: String },
            image: { type: String, default: '' },
            reaction: likesSchemaObject,
         },
      ],
   },
   { timestamps: true }
)

export const ChatModel = model<IChatSchema, IChatModel>('Chat', ChatSchema)
