import { Schema, model } from 'mongoose'
import { UserModel, IUserTypes } from '../../controllers/users/Types'

import { hash, compare } from 'bcrypt'

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

UserSchema.statics.jwtSign = async function () {}

export const User = model<IUserTypes, UserModel>('User', UserSchema)
