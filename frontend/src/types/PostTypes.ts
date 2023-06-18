import type { IPostComment, IPostLike } from './LikeTypes'

export interface IPopulatedUserId<T = IUserDetails> {
   _id: string
   email: string
   firstName: string
   sureName: string
   userDetails: T
}

export interface IPost {
   _id: string
   userId: IPopulatedUserId
   comments: IPostComment[]
   description: string
   likes: IPostLike[]
   postedPicturesPath: string[]
   createdAt: string
   updatedAt: string
}

export interface IUserTypes {
   _id: string
   email: string
   firstName: string
   sureName: string
   password: string
   isEmailConfirmed: boolean
   friends: { userId: string }[]
   userDetails: IUserDetails
   createdAt: number
   updatedAt: number
}

export interface IUserDetails {
   dateOfBirth: { day: number; month: number; year: number }
   gender: 'male' | 'female'
   profilePicturePath: IProfilePicture[]
   birthTown?: string
   homeTown?: string
   studies?: {
      elementary: {
         from: number
         to: number
         name: string
      }
      highSchool: {
         from: number
         to: number
         name: string
      }
      university: {
         from: number
         to: number
         name: string
      }
   }
   relationShip?: { isAlone: boolean; inRelation: boolean }
}

export interface IProfilePicture {
   _id: string
   path: string
   isSelected: boolean
}
