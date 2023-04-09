import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config/endpoints.config'

// Ez a middleware ellenőrzi,hogy van-e accessToken, ha nincs akkor lép működésbe az axios interceptor
export const authenticateAccessTokenForApi = (req: Request, res: Response, next: NextFunction) => {
   // az access token-re van itt szükségem
   const accessToken = req.cookies.accessToken as string | undefined

   if (!accessToken) return res.sendStatus(401)
   jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ errorMessage: 'accessToken token expired' })
      if (!decoded) return res.status(404).json({ errorMessage: 'user not found' })
      console.log(decoded)
      next()
   })
}
