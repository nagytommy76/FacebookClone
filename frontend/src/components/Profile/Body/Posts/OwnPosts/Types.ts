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

export interface IOwnPost {
   _id: string
   userId: IUserTypes
   comments: IPostComment[]
   description: string
   likes: IPostLike[]
   postedAt: string
   postedPicturesPath: string[]
   createdAt: number
   updatedAt: number
}

export interface IUserTypes {
   _id: string
   email: string
   firstName: string
   sureName: string
   password: string
   isEmailConfirmed: boolean
   friends: { userId: string }[]
   userDetails: {
      dateOfBirth: { day: number; month: number; year: number }
      gender: 'male' | 'female'
      profilePicturePath: string
      birthTown: string
      homeTown: string
      relationShip: { isAlone: boolean; inRelation: boolean }
   }
   createdAt: number
   updatedAt: number
}
