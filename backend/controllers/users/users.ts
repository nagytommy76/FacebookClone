import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../../config/endpoints.config'
import { ACCESS_TOKEN_EXPIRES_IN_MILLISEC } from './helpers/signtTokens'

// ez a controller fut le a next.js middleware-ből, ha ez pass-ol tuti van refreshTokenem a többi controller/middleware-nél
export const checkRefreshTokenValidityController = (req: Request, res: Response) => {
   // Ide a refresh token kell
   const refreshToken = req.body.refreshToken as string | undefined
   if (!refreshToken) return res.status(404).json({ errorMessage: 'refreshToken not found' })
   try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded: any) => {
         // Nem érvényes a refresh token, így a usernek ki kell lépnie
         if (error) return res.status(401).json({ errorMessage: 'refreshToken expired' })
         res.sendStatus(201)
      })
   } catch (error) {
      res.status(500).json(error)
   }
}
// Ezt fogom elérni majd az axios interceptorból
// Itt is tuti van refreshTokenem..
export const checkAccessTokenValidityController = (req: Request, res: Response) => {
   const refreshToken = req.cookies?.refreshToken as string | undefined
   if (!refreshToken) return res.sendStatus(401)
   try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded: any) => {
         if (error) return res.status(403).json({ errorMessage: 'refreshToken expired' })
         const newAccessToken = jwt.sign(
            {
               userId: decoded.userId,
               email: decoded.email,
               iat: decoded.iat,
               exp: decoded.exp,
            },
            ACCESS_TOKEN_SECRET
         )
         res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ACCESS_TOKEN_EXPIRES_IN_MILLISEC,
         }).sendStatus(201)
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

export const logoutUserController = async (req: Request, res: Response) => {
   // [0]: refreshToken [1]: accessToken
   const cookies = req.headers.cookie?.split(';')
   if (!cookies) return res.sendStatus(204)
   res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true })
   res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: true })
   res.status(200).json({ message: 'Sikeres kijelentkezés' })
}
