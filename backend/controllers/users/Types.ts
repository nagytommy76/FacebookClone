import { Model, ObjectId, Document } from 'mongoose'
import type { Request } from 'express'
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

export type NotificationType = 'isComment' | 'isPostLike' | 'isCommentLike'

export interface INotifications {
   _id?: string
   notificationType: NotificationType
   isRead: boolean
   createdAt: Date
   postData: {
      postId: string | ObjectId
      description: string
   }
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
   friends: { userId: ObjectId | string; isAccepted: boolean; createdAt: string }[]
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
         companyName: string
         post: string
         city: string
         from: number
         to: number
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
