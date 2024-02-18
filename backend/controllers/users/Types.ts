import { Model, ObjectId, Document } from 'mongoose'
import type { Request } from 'express'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'
export interface IRegisterRequest extends Request {
   body: {
      email: string
      sureName: string
      firstName: string
      password: string
      gender: 'male' | 'female'
      dateOfBirth: { day: number; month: number; year: number }
   }
}

export interface ILoginRequest extends Request {
   body: {
      email: string
      password: string
   }
}

export interface IGetUserDetailsRequest extends IJWTUserType {
   query: {
      userId: string | undefined
   }
}

export type NotificationType = 'isComment' | 'isPostLike' | 'isCommentLike' | 'isFriend'

export interface INotifications<T = { postId: string | ObjectId; description: string }> {
   _id?: string
   notificationType: NotificationType
   isRead: boolean
   createdAt: Date
   postData?: T
   userDetails: {
      userId: String | ObjectId
      firstName: string
      sureName: string
      profilePicture: string
   }
}

export interface IUserTypes {
   _id: ObjectId
   email: string
   firstName: string
   sureName: string
   password: string
   isEmailConfirmed: boolean
   friends: { userId: ObjectId | string; isAccepted: boolean; createdAt: string | Date }[]
   notifications: INotifications[]
   userDetails: {
      dateOfBirth: { day: number; month: number; year: number }
      gender: 'male' | 'female'
      profilePicturePath: {
         _id?: ObjectId | string
         path: string
         isSelected: boolean
      }[]
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
      Document<unknown, any, IUserTypes> &
         Omit<
            IUserTypes &
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
      likedUserId: string,
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
