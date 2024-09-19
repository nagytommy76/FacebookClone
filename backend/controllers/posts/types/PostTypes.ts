import { Request } from 'express'

// Incoming request from Add post
export interface IPostRequest extends Request {
   body: {
      description: string
      createdAt: string
   }
}
export interface IPostImageRequest extends Request {
   body: {
      postId: string
      postedPicturesPath?: string[]
   }
}

// Incoming Request for like posts

export type LikeTypes = 'isLike' | 'isLove' | 'isCare' | 'isHaha' | 'isWow' | 'isSad' | 'isAngry'

export interface IPostLikeRequest extends Request {
   body: {
      reactionType: LikeTypes
      postId: string
   }
}
export interface IGetLikesRequest extends Request {
   body: {
      postId: string
      commentId: string
   }
}
export interface IGetAnswerLikesRequest extends Request {
   body: {
      postId: string
      commentId: string
      answerId: string
   }
}

export interface ICommentLikeRequest extends Request {
   body: {
      reactionType: LikeTypes
      postId: string
      commentId: string
   }
}
export interface ICommentAnswerLikeRequest extends Request {
   body: {
      postId: string
      commentId: string
      commentAnswerId: string
      reactionType: LikeTypes
   }
}

// TÖRLÉS

export interface ICommentRemoveLikeRequest extends Request {
   body: {
      likeIdToDelete: string
      postId: string
      commentId: string
   }
}
export interface IAnswerRemoveLikeRequest extends Request {
   body: {
      answerId: string
      postId: string
      commentId: string
      likeIdToDelete: string
   }
}

export interface IPostRemoveLikeRequest extends Request {
   body: {
      postId: string
   }
}
