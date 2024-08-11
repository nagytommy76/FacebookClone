import { ObjectId } from 'mongoose'
import type { INotifications } from '../../notifications/types/notificationTypes'

export interface IProfilePicturePath {
   _id?: ObjectId | string
   path: string
   isSelected: boolean
}

export interface IUserTypes {
   _id: ObjectId
   email: string
   firstName: string
   sureName: string
   password: string
   isEmailConfirmed: boolean
   friends: {
      friend: ObjectId
      isSender?: boolean
      friendSince?: Date
      status?: 'pending' | 'friends' | 'rejected'
   }[]
   notifications: INotifications[]
   userDetails: {
      dateOfBirth: { day: number; month: number; year: number }
      gender: 'male' | 'female'
      profilePicturePath: IProfilePicturePath[]
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
         _id?: string
         companyName: string
         position: string
         description: string
         city: string
         startDate: string
         endDate?: string | null
      }[]
   }
   posts: ObjectId[]
   createdAt: number
   updatedAt: number
}
