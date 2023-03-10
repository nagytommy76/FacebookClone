import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../../config/endpoints.config'
import { signAccessAndRefreshToken, ACCESS_TOKEN_EXPIRES_IN_MILLISEC } from './helpers/signtTokens'

export const checkRefreshTokenValidityController = (req: Request, res: Response) => {
   // Ide a refresh token kell
   const refreshToken = req.body.refreshToken as string | undefined
   const accessToken = req.body.accessToken as string | undefined
   if (!refreshToken) return res.status(404).json({ errorMessage: 'refreshToken not found' })
   if (!accessToken) return res.status(404).json({ errorMessage: 'accessToken not found' })
   console.log(accessToken)
   try {
      jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
         // Nem érvényes az accessToken, kell egy új ha a refresh token jó ->
         if (err) {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decodedRefresh: any) => {
               // Ekkor ki kell lépnie a usernek
               if (error) return res.status(401).json({ errorMessage: 'refreshToken expired' })
               // viszont ha jó, új accessToken generálni, és visszaküldeni cookie-ként
               const { accessToken } = signAccessAndRefreshToken(decodedRefresh._id, decodedRefresh.email)

               res.cookie('accessToken', accessToken, {
                  httpOnly: true,
                  secure: true,
                  sameSite: 'none',
                  maxAge: ACCESS_TOKEN_EXPIRES_IN_MILLISEC,
               })
               res.status(200).json({ accessToken, expiresIn: ACCESS_TOKEN_EXPIRES_IN_MILLISEC })
               // res.sendStatus(201)
            })
         } else res.sendStatus(201)
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

// Későbbiekben ez lehet middleware (API route-okat védem ezzel)
// export const checkAccessTokenValidityForAPIController = (req: Request, res: Response) => {
//    // Ide a refresh token kell
//    const refreshToken = req.body.refreshToken as string | undefined
//    if (!refreshToken) return res.sendStatus(401)
//    try {
//       jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded: any) => {
//          if (err) return res.status(403).json({ errorMessage: 'refresh token expired' })

//          const { accessToken } = signAccessAndRefreshToken(decoded._id, decoded.email)

//          res.status(200).json({ accessToken, expiresIn: ACCESS_TOKEN_EXPIRES_IN_MILLISEC })
//       })
//    } catch (error) {
//       res.status(500).json(error)
//    }
// }
