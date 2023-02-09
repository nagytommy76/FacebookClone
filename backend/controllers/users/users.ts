import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { User as UserModel } from '../../models/user/user'

export const registerUserController = async (req: Request, res: Response) => {
   const sureName = req.body.sureName
   const firstName = req.body.firstName
   const email = req.body.email
   const dateOfBirth = req.body.dateOfBirth

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      await UserModel.register(email)
      res.status(201).json({
         sureName,
         firstName,
         email,
         message: 'A regisztráció sikeres volt',
      })
   } catch (error) {
      res.status(500).json({ error })
   }
}
