import { Model, ObjectId } from 'mongoose'
import type { IPostComment } from './commentTypes'
import type { ILike } from '../../Base/Types'
import type { IPostQueryHelper } from './postQueryHelper'

export interface IPostTypes {
   _id: ObjectId
   userId: ObjectId
   description: string
   postedPicturesPath: string[]
   likes: ILike[]
   comments: IPostComment[]
   createdAt: number
   updatedAt: number
}

export type PostModel = Model<
   IPostTypes,
   IPostQueryHelper,
   {
      populateUserId: () => Promise<void>
      populateCommentUserId: () => Promise<void>
      populateCommentAnswerUserId: () => Promise<void>
   }
>
