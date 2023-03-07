import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET } from '../../config/endpoints.config'
import { signAccessAndRefreshToken } from './helpers/signtTokens'

export const checkRefreshTokenValidityController = (req: Request, res: Response) => {
   // Ide a refresh token kell
   const refreshToken = req.body.refreshToken as string | undefined
   if (!refreshToken) return res.sendStatus(401)
   try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded: any) => {
         if (err) return res.status(403).json({ errorMessage: 'refresh token expired' })

         const { accessToken } = signAccessAndRefreshToken(decoded._id, decoded.email)

         res.status(200).json(accessToken)
      })
   } catch (error) {
      res.status(500).json(error)
   }
}
