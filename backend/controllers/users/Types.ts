import { Model, ObjectId, Document } from 'mongoose'
import { Request } from 'express'
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
   dateOfBirth: { day: number; month: number; year: number }
   gender: 'male' | 'female'
   iat?: number
   exp?: number
}

export interface UserModel extends Model<IUserTypes> {
   checkRegisterEmail(email: string): Promise<void>
   encryptPassword(nativePass: string): Promise<string>
   comparePassword(
      email: string,
      plainPass: string
   ): Promise<{ isPasswordCorrect: boolean; foundUser: IUserTypes }>
}
