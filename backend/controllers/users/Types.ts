import { Model, ObjectId } from 'mongoose'
import { Request } from 'express'
import type { IPostTypes } from '../posts/PostTypes'
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

export interface IUserTypes {
   _id: ObjectId
   email: string
   firstName: string
   sureName: string
   password: string
   isEmailConfirmed: boolean
   friends: { userId: ObjectId }[]
   userDetails: {
      dateOfBirth: { day: number; month: number; year: number }
      gender: 'male' | 'female'
      profilePicturePath: string
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
   }
   posts: { userId: ObjectId } | IPostTypes
   createdAt: number
   updatedAt: number
}

export interface UserModel extends Model<IUserTypes> {
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
