import { ObjectId } from 'mongoose'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export interface IPostLike {
   userId: ObjectId
   reactionType: {
      isLike: boolean
      isLove: boolean
      isHaha: boolean
      isWow: boolean
      isSad: boolean
      isAngry: boolean
   }
}

export interface IPostComment {
   userId: ObjectId
   answer: string
   answeredAt: Date
   parentCommentId: string
   commentDepth: number
   likes: IPostLike
}

export interface IPostTypes {
   _id: ObjectId
   userId: ObjectId
   description: string
   postedPicturesPath: string[]
   postedAt: Date
   likes: IPostLike
   comments: IPostComment
}

// Incoming request from Add post
export interface IPostRequest extends IJWTUserType {
   body: {
      description: string
      postedPicturesPath?: string[]
   }
}
