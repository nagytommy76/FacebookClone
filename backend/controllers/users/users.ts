import { Response, Request } from 'express'
import { User as UserModel } from '../../models/user/user'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config/endpoints.config'

export const checkRefreshTokenValidityController = (req: Request, res: Response) => {
   // Ide a refresh token kell
   const refreshToken = req.body.refreshToken as string | undefined
   if (!refreshToken) return res.sendStatus(401)
   try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded: any) => {
         if (err) return res.status(403).json({ errorMessage: 'refresh token expired' })
         const accessToken = UserModel.jwtAccessTokenSign(
            decoded._id,
            decoded.email,
            ACCESS_TOKEN_SECRET,
            '1min'
         )
         res.status(200).json(accessToken)
      })
   } catch (error) {
      res.status(500).json(error)
   }
}
