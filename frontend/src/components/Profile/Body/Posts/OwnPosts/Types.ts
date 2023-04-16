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
   userId: string
   reactionType: {
      isLike: boolean
      isLove: boolean
      isHaha: boolean
      isWow: boolean
      isSad: boolean
      isAngry: boolean
   }
}

export interface IOwnPost {
   _id: string
   userId: string
   comments: IPostComment[]
   description: string
   likes: IPostLike[]
   postedAt: string
   postedPicturesPath: string[]
}
