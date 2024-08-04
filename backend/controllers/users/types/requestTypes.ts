import { ObjectId } from 'mongoose'
import type { Request } from 'express'
import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'
import type { IProfilePicturePath } from './ModelTypes'

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

export type SelectUserByIdType = {
   _id: string | ObjectId
   firstName: string
   sureName: string
   email: string
   selectedProfilePicturePath: IProfilePicturePath[]
}
