import { Schema, model } from 'mongoose'
import type { IPostTypes } from '../../controllers/posts/types/PostTypes'

const likes = {
   type: [
      {
         userId: { type: Schema.Types.ObjectId, ref: 'User' },
         reactionType: {
            isLike: { type: Boolean, default: false },
            isLove: { type: Boolean, default: false },
            isCare: { type: Boolean, default: false },
            isHaha: { type: Boolean, default: false },
            isWow: { type: Boolean, default: false },
            isSad: { type: Boolean, default: false },
            isAngry: { type: Boolean, default: false },
         },
      },
   ],
   required: false,
}

const answerBase = {
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
   comment: { type: String, required: true },
   parentCommentId: { type: String, required: false, default: null },
   commentDepth: { type: Number, required: true, default: 1 },
   answeredAt: { type: Date, required: false, default: new Date() },
   commentImage: { type: String, required: false, default: null },
   likes,
}

const childAnswers = {
   type: [
      {
         ...answerBase,
         childAnswers: { type: [answerBase], required: false },
      },
   ],
}

const commentAnswers = {
   type: [
      {
         ...answerBase,
         childAnswers: { type: [childAnswers], required: false },
      },
   ],
   required: false,
}

const PostsSchema = new Schema(
   {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      description: String,
      postedPicturesPath: { type: [String], required: false },
      likes,
      comments: {
         type: [
            {
               userId: { type: Schema.Types.ObjectId, ref: 'User' },
               comment: { type: String, required: true },
               answeredAt: { type: Date, required: false, default: new Date() },
               commentImage: { type: String, required: false, default: null },
               commentAnswers,
               likes,
            },
         ],
         required: false,
      },
   },
   { timestamps: true }
)

export const Posts = model<IPostTypes>('Posts', PostsSchema)
