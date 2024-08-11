import { Schema, model } from 'mongoose'
import type { IPostTypes, PostModel } from '../../controllers/posts/types/postModelType'

export const likesSchemaObject = {
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

const commentAnswers = {
   type: [
      {
         userId: { type: Schema.Types.ObjectId, ref: 'User' },
         comment: { type: String, required: true },
         parentCommentId: { type: String, required: false, default: null },
         commentDepth: { type: Number, required: true, default: 1 },
         answeredAt: { type: Date, required: false, default: new Date() },
         commentImage: { type: String, required: false, default: null },
         likes: likesSchemaObject,
      },
   ],
   required: false,
}

const PostsSchema = new Schema<IPostTypes, PostModel>(
   {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      description: String,
      postedPicturesPath: { type: [String], required: false },
      likes: likesSchemaObject,
      comments: {
         type: [
            {
               userId: { type: Schema.Types.ObjectId, ref: 'User' },
               comment: { type: String, required: true },
               answeredAt: { type: Date, required: false, default: new Date() },
               commentImage: { type: String, required: false, default: null },
               commentAnswers,
               likes: likesSchemaObject,
            },
         ],
         required: false,
      },
   },
   {
      query: {
         selectAndPopulateUserPicure(selectField, path, selectArray = []) {
            return this.select(selectField).populate({
               path: path,
               select: ['_id', 'firstName', 'sureName', 'userDetails.profilePicturePath.$'].concat(
                  selectArray
               ),
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })
         },
      },
      timestamps: true,
   }
)

PostsSchema.methods.populateUserId = async function () {
   return this.populate({
      path: 'userId',
      select: ['email', '_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
      match: {
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      },
   })
}
PostsSchema.methods.populateCommentUserId = async function () {
   return this.populate({
      path: 'comments.userId',
      select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
      match: {
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      },
   })
}
PostsSchema.methods.populateCommentAnswerUserId = async function () {
   return this.populate({
      path: 'comments.commentAnswers.userId',
      select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
      match: {
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      },
   })
}

export const Posts = model<IPostTypes, PostModel>('Posts', PostsSchema)
