import jwt from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'

import type { DefaultSchemaOptions, ObjectId, Schema } from 'mongoose'
import type { IUserTypes, UserModel } from '../../controllers/users/Types'

export function UserStatics(
   UserSchema: Schema<IUserTypes, UserModel, {}, {}, {}, {}, DefaultSchemaOptions, IUserTypes>
) {
   UserSchema.statics.encryptPassword = async function (nativePass: string) {
      return await hash(nativePass, 10)
   }
   UserSchema.statics.comparePassword = async function (email: string, plainPass: string) {
      const foundUser = await this.findOne({ email })
      if (!foundUser) throw new Error('Nincs regisztrálva felhasználó ilyen email címmel!')
      const isPasswordCorrect = await compare(plainPass, foundUser.password)
      return { isPasswordCorrect, foundUser }
   }

   UserSchema.statics.jwtAccessTokenSign = function (
      userId: string | ObjectId,
      email: string,
      ACCESS_TOKEN_SECRET: string,
      expiresIn: string = '15min'
   ) {
      return jwt.sign({ userId, email }, ACCESS_TOKEN_SECRET, { expiresIn })
   }

   UserSchema.statics.jwtRefreshTokenSign = function (
      userId: string | ObjectId,
      email: string,
      REFRESH_TOKEN_SECRET: string,
      expiresIn: string = '1day'
   ) {
      return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn })
   }
}
