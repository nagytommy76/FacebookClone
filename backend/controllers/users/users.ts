import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const registerUserController = async (req: Request, res: Response) => {
   const sureName = req.body.sureName
   const firstName = req.body.firstName
   const email = req.body.email

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   res.status(201).json({
      sureName,
      firstName,
      email,
      message: 'A regisztráció sikeres volt',
   })
}
