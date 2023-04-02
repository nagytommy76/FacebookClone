import { Schema, model } from 'mongoose'

const likes = {
   type: [
      {
         userId: { type: Schema.Types.ObjectId, ref: 'User' },
         reactionType: {
            isLike: Boolean,
            isLove: Boolean,
            isHaha: Boolean,
            isWow: Boolean,
            isSad: Boolean,
            isAngry: Boolean,
         },
      },
   ],
   required: false,
}

const PostsSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
   description: String,
   postedPicturesPath: { type: [String], required: false },
   postedAt: Date,
   likes,
   comments: {
      type: [
         {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            answer: { type: String, required: true },
            answeredAt: { type: Date, required: true },
            parentCommentId: { type: String, required: false, default: null },
            commentDepth: { type: Number, required: true, default: 1 },
            likes,
         },
      ],
      required: false,
   },
})

export const Posts = model('Posts', PostsSchema)
