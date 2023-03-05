import { User as UserModel } from '../../models/user/user'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config/endpoints.config'
import type { Response } from 'express'
import type { ILoginRequest } from './Types'

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

export const loginUserController = async (req: ILoginRequest, res: Response) => {
   const { email, password } = req.body
   try {
      const { foundUser, isPasswordCorrect } = await UserModel.comparePassword(email, password)
      if (!isPasswordCorrect)
         return res.status(403).json(errorResponse(true, 'Helytelen jelszó!', 'password'))

      const accessToken = UserModel.jwtAccessTokenSign(
         foundUser._id,
         foundUser.email,
         ACCESS_TOKEN_SECRET,
         '1min'
      )
      const refreshToken = UserModel.jwtRefreshTokenSign(foundUser._id, foundUser.email, REFRESH_TOKEN_SECRET)

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
