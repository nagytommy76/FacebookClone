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
            // userName: { type: String, required: true },
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

/**
 *   {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    location: "New York, CA",
    description: "Some really long random description",
    picturePath: "post1.jpeg",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      "random comment",
      "another random comment",
      "yet another random comment",
    ],
  },
 */
