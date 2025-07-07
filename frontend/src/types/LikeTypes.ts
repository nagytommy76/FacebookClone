import type { IPopulatedUserId } from './PostTypes'

// Ez egyelőre nem biztos, hogy így lesz -------------------------------
interface IProfilePicture {
   _id: string
   path: string
   isSelected: boolean
}

export interface ICommentAnswers {
   _id: string
   userId: IPopulatedUserId<{
      profilePicturePath: IProfilePicture[]
   }>
   comment: string
   parentCommentId: string
   commentDepth: number
   answeredAt: string
   commentImage: string | null
   likes: ILike[]
   isDeleted: boolean
}

export interface IPostComment {
   [key: string]: any
   _id: string
   userId: IPopulatedUserId<{
      profilePicturePath: IProfilePicture[]
   }>
   comment: string
   answeredAt: string
   likes: ILike[]
   commentImage: string | null
   commentAnswers: ICommentAnswers[]
}
// Ez egyelőre nem biztos, hogy így lesz ------------------------------
export interface ILike {
   _id: string
   userId: IPopulatedUserId | string
   reactionType: {
      [index: string]: boolean
      isLike: boolean
      isLove: boolean
      isCare: boolean
      isHaha: boolean
      isWow: boolean
      isSad: boolean
      isAngry: boolean
   }
}

export type LikeTypes = 'isLike' | 'isLove' | 'isCare' | 'isHaha' | 'isWow' | 'isSad' | 'isAngry'

// LIKES COUNT --------------------------------------
export interface IOrderedLikesCount {
   [index: string]: number
   isAngry: number
   isCare: number
   isHaha: number
   isLike: number
   isLove: number
   isSad: number
   isWow: number
}

export interface IReactors {
   firstName: string
   sureName: string
   userDetails: {
      profilePicturePath: { isSelected: boolean; path: string; id: string }[]
   }
}

export type ReactionType = {
   [Key in LikeTypes]: {
      count: number
      reactors: IReactors[]
   }
}
export interface IReactionCount {
   totalReactionCount: number
   reactionTypes: ReactionType
}
