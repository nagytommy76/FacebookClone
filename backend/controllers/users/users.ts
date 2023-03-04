import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config/endpoints.config'

import type { ILoginRequest } from './Types'

export const loginUserController = async (req: ILoginRequest, res: Response) => {
   const { email, password } = req.body
   try {
      const { foundUser, isPasswordCorrect } = await UserModel.comparePassword(email, password)
      if (!isPasswordCorrect)
         return res.status(403).json(errorResponse(true, 'Helytelen jelszó!', 'password'))

      const { accessToken, refreshToken } = UserModel.jwtAccessRefreshTokenSign(
         foundUser._id,
         foundUser.email,
         ACCESS_TOKEN_SECRET,
         REFRESH_TOKEN_SECRET,
         '1min'
      )
      res.cookie('accessToken', accessToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         maxAge: 2 * 24 * 60 * 60 * 1000, // 2 nap * 24 óra * 1óra * 1 perc
      })
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         maxAge: 2 * 24 * 60 * 60 * 1000, // 2 nap * 24 óra * 1óra * 1 perc
      })

      return res.status(200).json({
         isPasswordCorrect,
         accessToken,
         userId: foundUser._id,
         userName: `${foundUser.firstName} ${foundUser.sureName}`,
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

const errorResponse = (isError: boolean, msg: string, param: string, value: string = '') => {
   return {
      errors: [
         {
            isError,
            msg,
            param,
            value,
         },
      ],
   }
}
