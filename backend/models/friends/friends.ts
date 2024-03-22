import { Schema, model, Types } from 'mongoose'
import type { IFriendsSchema, IFriendsModel } from './Types'

/**
 * @pending friendship hasn't accepted yet.
 * @friends friendship was made
 */

const FriendsSchema = new Schema<IFriendsSchema, IFriendsModel>(
   {
      senderUser: {
         type: Types.ObjectId,
         ref: 'User',
         unique: true,
      },
      receiverUser: {
         type: Types.ObjectId,
         ref: 'User',
         unique: true,
      },
      status: {
         type: String,
         enum: ['pending', 'friends'],
      },
   },
   { timestamps: true }
)

export const FriendsModel = model<IFriendsSchema, IFriendsModel>('Friends', FriendsSchema)
