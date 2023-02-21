import { Schema, model, ObjectId } from 'mongoose'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserModel, IUserTypes } from '../../controllers/users/Types'

const UserSchema = new Schema<IUserTypes, UserModel>({
   firstName: String,
   sureName: String,
   isEmailConfirmed: {
      type: Boolean,
      default: false,
   },
   email: {
      type: String,
      required: [true, 'Kérek egy email címet!'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Adjon meg egy jelszót!'],
      minlength: [4, 'a jelszó min. 4 karakter legyen!'],
   },
   gender: {
      type: String,
      required: true,
   },
   dateOfBirth: {
      type: Date,
      required: true,
   },
})

UserSchema.statics.encryptPassword = async function (nativePass: string) {
   return await hash(nativePass, 10)
}
UserSchema.statics.comparePassword = async function (email: string, plainPass: string) {
   const foundUser = await this.findOne({ email })
   if (!foundUser) throw new Error('Nincs regisztrálva felhasználó ilyen email címmel!')
   const isPasswordCorrect = await compare(plainPass, foundUser.password)
   return { isPasswordCorrect, foundUser }
}

UserSchema.statics.jwtSign = function (
   userId: string | ObjectId,
   email: string,
   TOKEN_SECRET: string,
   expiresIn: string = '15min'
) {
   return jwt.sign({ userId, email }, TOKEN_SECRET, { expiresIn })
}

export const User = model<IUserTypes, UserModel>('User', UserSchema)
