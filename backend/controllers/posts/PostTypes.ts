import { ObjectId } from 'mongoose'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export interface IReactionTypes {
   [index: string]: boolean
   isLike: boolean
   isLove: boolean
   isCare: boolean
   isHaha: boolean
   isWow: boolean
   isSad: boolean
   isAngry: boolean
}

export interface IPostLike {
   _id?: string | ObjectId
   userId: ObjectId
   reactionType: IReactionTypes
}

export interface IPostComment {
   userId:
      | ObjectId
      | string
      | {
           firstName: string
           sureName: string
           userDetails: { profilePicturePath: { _id: string; path: string; isSelected: boolean }[] }
        }
   comment: string
   answeredAt?: Date
   commentImage?: string
   parentCommentId: string | null
   commentDepth: number
   likes: IPostLike[]
}

export interface IPostTypes {
   _id: ObjectId
   userId: ObjectId
   description: string
   postedPicturesPath: string[]
   likes: IPostLike[]
   comments: IPostComment[]
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

export type LikeTypes = 'isLike' | 'isLove' | 'isCare' | 'isHaha' | 'isWow' | 'isSad' | 'isAngry'

export interface IPostLikeRequest extends IJWTUserType {
   body: {
      reactionType: LikeTypes
      postId: string
   }
}

export interface ICommentLikeRequest extends IJWTUserType {
   body: {
      reactionType: LikeTypes
      postId: string
      commentId: string
   }
}

export interface IPostRemoveLikeRequest extends IJWTUserType {
   body: {
      postId: string
   }
}
