import { Model, Types, ObjectId, Document } from 'mongoose'
import type { INotifications, NotificationType } from '../../notifications/types/notificationTypes'
import type { SelectUserByIdType } from './requestTypes'

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
   friends: Types.ObjectId[]
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

export interface UserModel extends Model<IUserTypes> {
   getUserByUserIdAndSelect: (userId: string | ObjectId) => Promise<
      Document<unknown, any, SelectUserByIdType[]> &
         Omit<
            SelectUserByIdType[] &
               Required<{
                  _id: ObjectId
               }>,
            never
         >
   >
   getSaveNotification: (
      foundPostUserId: string | ObjectId,
      foundPostDescription: string,
      firstName: string,
      sureName: string,
      likedUserId: string | ObjectId,
      profilePicture: string,
      notificationType: NotificationType
   ) => Promise<
      Document<unknown, any, IUserTypes> &
         Omit<
            IUserTypes &
               Required<{
                  _id: ObjectId
               }>,
            never
         >
   >
   checkRegisterEmail(email: string): Promise<void>
   encryptPassword(nativePass: string): Promise<string>
   comparePassword(
      email: string,
      plainPass: string
   ): Promise<{ isPasswordCorrect: boolean; foundUser: IUserTypes }>
   jwtAccessTokenSign(
      userId: string | ObjectId,
      email: string,
      ACCESS_TOKEN_SECRET: string,
      expiresIn?: string
   ): string
   jwtRefreshTokenSign(
      userId: string | ObjectId,
      email: string,
      REFRESH_TOKEN_SECRET: string,
      expiresIn?: string
   ): string
}
