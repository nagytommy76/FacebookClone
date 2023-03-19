import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET } from '../../config/endpoints.config'

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

export const logoutUserController = async (req: Request, res: Response) => {
   // [0]: refreshToken [1]: accessToken
   const cookies = req.headers.cookie?.split(';')
   if (!cookies) return res.sendStatus(204)
   res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true })
   res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: true })
   res.status(200).json({ message: 'Sikeres kijelentkezés' })
}
