import { User as UserModel } from '../../models/user/user'
import { errorResponse } from './helpers/errorResponse'
import { signAccessAndRefreshToken } from './helpers/signtTokens'
import { REFRESH_TOKEN_EXPIRES_IN_MILLISEC, ACCESS_TOKEN_EXPIRES_IN_MILLISEC } from './helpers/signtTokens'

import type { Response } from 'express'
import type { ILoginRequest } from './types/requestTypes'

export const loginUserController = async (req: ILoginRequest, res: Response) => {
   const { email, password } = req.body
   try {
      const { foundUser, isPasswordCorrect } = await UserModel.comparePassword(email, password)
      if (!isPasswordCorrect)
         return res.status(403).json(errorResponse(true, 'Helytelen jelszó!', 'password'))

      const { accessToken, refreshToken } = signAccessAndRefreshToken(foundUser._id, foundUser.email)

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         maxAge: REFRESH_TOKEN_EXPIRES_IN_MILLISEC,
      })
      res.cookie('accessToken', accessToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         maxAge: ACCESS_TOKEN_EXPIRES_IN_MILLISEC,
      })
         .status(200)
         .json({
            isPasswordCorrect,
            accessToken,
            userId: foundUser._id,
            userName: `${foundUser.firstName} ${foundUser.sureName}`,
            currentImage: foundUser.userDetails.profilePicturePath[0],
         })
   } catch (error) {
      res.status(500).json(error)
   }
}
