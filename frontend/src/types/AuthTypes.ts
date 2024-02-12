import type { IPost, IProfilePicture } from './PostTypes'

export interface IUserDetails {
   dateOfBirth: { day: number; month: number; year: number }
   gender: 'female' | 'male'
   profilePicturePath: IProfilePicture[]
   birthTown: string
   homeTown: string
   relationShip: { isAlone: boolean; inRelation: boolean }
   studies: {
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
   workPlaces: {
      _id: string
      companyName: string
      position: string
      description: string
      city: string
      startDate: string
      endDate?: string | null
   }[]
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
   posts: IPost[] | string[] | any
   createdAt: number
   updatedAt: number
}

export interface IUserPopulatedPosts extends IUserTypes {
   posts: IPost[]
}

export type ErrorResponse = { location: string; msg: string; path: string; value: string }[]
