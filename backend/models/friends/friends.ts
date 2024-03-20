import { Schema, model, Types } from 'mongoose'
import type { IFriendsSchema, IFriendsModel } from './Types'

/**
 * @pending friendship hasn't accepted yet.
 * @friends
 */

const FriendsSchema = new Schema<IFriendsSchema, IFriendsModel>(
   {
      //   senderUser: {
      //      type: {
      //         userId: { type: Types.ObjectId, ref: 'User' },
      //         status: {
      //            type: String,
      //            enum: ['pending', 'friends'],
      //         },
      //      },
      //   },
      //   receiverUser: {
      //      userId: { type: Types.ObjectId, ref: 'User' },
      //      status: {
      //         type: String,
      //         enum: ['pending', 'friends'],
      //      },
      //   },
      senderUser: {
         type: Types.ObjectId,
         ref: 'User',
      },
      receiverUser: {
         type: Types.ObjectId,
         ref: 'User',
      },
      status: {
         type: String,
         enum: ['pending', 'friends'],
      },
   },
   { timestamps: true }
)

export const FriendsModel = model<IFriendsSchema, IFriendsModel>('Friends', FriendsSchema)
