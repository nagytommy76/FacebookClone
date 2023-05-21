import type { IPost, IProfilePicture } from '../Posts/Types'

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
         companyName: string
         post: string
         city: string
         from: number
         to: number
      }[]
   }
   posts: string[] | any
   createdAt: number
   updatedAt: number
}

export interface IUserPopulatedPosts extends IUserTypes {
   posts: IPost[]
}
