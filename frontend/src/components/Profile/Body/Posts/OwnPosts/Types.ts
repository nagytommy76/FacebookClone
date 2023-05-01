import type { IPostComment, IPostLike } from '../../../../Posts/SinglePost/Like/Types'

export interface IPost {
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
