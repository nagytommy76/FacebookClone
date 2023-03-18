import { User as UserModel } from '../../../models/user/user'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../../config/endpoints.config'
import { convertStringToMillisec } from './convertMilsec'

import type { ObjectId } from 'mongoose'

export const REFRESH_TOKEN_EXPIRES_IN = '1day'
export const REFRESH_TOKEN_EXPIRES_IN_MILLISEC = convertStringToMillisec(REFRESH_TOKEN_EXPIRES_IN)

export const ACCESS_TOKEN_EXPIRES_IN = '15min'
export const ACCESS_TOKEN_EXPIRES_IN_MILLISEC = convertStringToMillisec(ACCESS_TOKEN_EXPIRES_IN)

export const signAccessAndRefreshToken = (userId: ObjectId, email: string) => {
   const accessToken = UserModel.jwtAccessTokenSign(
      userId,
      email,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
   )
   const refreshToken = UserModel.jwtRefreshTokenSign(
      userId,
      email,
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_EXPIRES_IN
   )

   return { accessToken, refreshToken }
}
