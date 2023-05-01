interface IPopulatedUserId {
   _id: string
   email: string
   firstName: string
   sureName: string
   userDetails: { profilePicturePath: string }
}

// Ez egyelőre nem biztos, hogy így lesz -------------------------------
export interface IPostComment {
   userId: string
   answer: string
   answeredAt: Date
   parentCommentId: string
   commentDepth: number
   likes: IPostLike
}
// Ez egyelőre nem biztos, hogy így lesz ------------------------------
export interface IPostLike {
   _id: string
   userId: IPopulatedUserId
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
