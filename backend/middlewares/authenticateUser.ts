/// <reference path="../src/@types/index.d.ts" />
import { NextFunction, Response, Request } from 'express'

export const authenticateUserCredentials = (req: Request, res: Response, next: NextFunction) => {
   const loggedInUserID = req.user.userId
   const userToModify = req.query.userToModify as string | undefined

   if (!userToModify) return res.status(404).json({ msg: 'Required userToModify param field' })
   if (userToModify != loggedInUserID) return res.status(401).json({ msg: "You can't modify this resource" })

   next()
}
