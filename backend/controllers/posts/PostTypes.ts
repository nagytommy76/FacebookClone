import { ObjectId } from 'mongoose'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

interface IReactionTypes {
   isLike: boolean
   isLove: boolean
   isCare: boolean
   isHaha: boolean
   isWow: boolean
   isSad: boolean
   isAngry: boolean
}

export interface IPostLike {
   userId: ObjectId
   reactionType: IReactionTypes
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
   likes: IPostLike
   comments: IPostComment
   createdAt: number
   updatedAt: number
}

// Incoming request from Add post
export interface IPostRequest extends IJWTUserType {
   body: {
      description: string
      postedPicturesPath?: string[]
   }
}

// Incoming Request for like posts
export interface IPostLikeRequest extends IJWTUserType {
   body: {
      reactionType: IReactionTypes
      postId: string
   }
}
