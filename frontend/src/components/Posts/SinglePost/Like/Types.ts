import type { IPopulatedUserId } from '../../Types'

// Ez egyelőre nem biztos, hogy így lesz -------------------------------
export interface IPostComment {
   _id: string
   userId: IPopulatedUserId<{
      firstName: string
      sureName: string
      profilePicturePath: { _id: string; path: string; isSelected: boolean }[]
   }>
   comment: string
   answeredAt: string
   parentCommentId: string
   commentDepth: number
   likes: IPostLike[]
}
// Ez egyelőre nem biztos, hogy így lesz ------------------------------
export interface IPostLike {
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
