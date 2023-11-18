import { ObjectId } from 'mongoose'
import { IJWTUserType } from '../../../middlewares/accessTokenRefresh'
import type { IPostComment } from './commentTypes'

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
      createdAt: string
   }
}
export interface IPostImageRequest extends IJWTUserType {
   body: {
      postId: string
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
export interface IGetLikesRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
   }
}
export interface IGetAnswerLikesRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      answerId: string
   }
}

export interface ICommentLikeRequest extends IJWTUserType {
   body: {
      reactionType: LikeTypes
      postId: string
      commentId: string
   }
}
export interface ICommentAnswerLikeRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      commentAnswerId: string
      reactionType: LikeTypes
   }
}

// TÖRLÉS

export interface ICommentRemoveLikeRequest extends IJWTUserType {
   body: {
      likeIdToDelete: string
      postId: string
      commentId: string
   }
}
export interface IAnswerRemoveLikeRequest extends IJWTUserType {
   body: {
      answerId: string
      postId: string
      commentId: string
      likeIdToDelete: string
   }
}

export interface IPostRemoveLikeRequest extends IJWTUserType {
   body: {
      postId: string
   }
}
