import { Model, ObjectId } from 'mongoose'

export interface UserTypes {
   _id: ObjectId
   firstName: string
   sureName: string
   password: string
   isEmailConfirmed: boolean
   iat?: number
   exp?: number
}

export interface UserModel extends Model<UserTypes> {
   register(email: string): Promise<void>
}
