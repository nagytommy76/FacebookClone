import { Schema, model } from 'mongoose'
import { UserModel, UserTypes } from '../../controllers/users/Types'

import { hash } from 'bcrypt'

const Userschema = new Schema({
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

Userschema.statics.checkRegisterEmail = async function (email: string) {
   const checkUserRegisteredWithEmail = await this.findOne({ email })
   console.log(checkUserRegisteredWithEmail)
   if (checkUserRegisteredWithEmail != null) {
      throw new Error('Ezzel az email címmel már regisztráltak!')
   }
}
Userschema.statics.encryptPassword = async function (nativePass: string) {
   return await hash(nativePass, 10)
}

export const User = model<UserTypes, UserModel>('User', Userschema)
