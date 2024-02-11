import { NextFunction, Response } from 'express'
import type { IJWTUserType } from './accessTokenRefresh'

export const authenticateUserCredentials = (req: IJWTUserType, res: Response, next: NextFunction) => {
   const loggedInUserID = req.user?.userId
   const userToModify = req.query.userToModify as string | undefined

   if (!userToModify) return res.status(404).json({ msg: 'Required userToModify param field' })
   if (userToModify != loggedInUserID) return res.status(401).json({ msg: "You can't modify this resource" })

   next()
}
