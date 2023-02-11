import { Response } from 'express'
import { validationResult } from 'express-validator'
import { IRegisterRequest } from './Types'

import { User as UserModel } from '../../models/user/user'

export const registerUserController = async (req: IRegisterRequest, res: Response) => {
   const sureName = req.body.sureName
   const firstName = req.body.firstName
   const email = req.body.email
   const nativePassword = req.body.password
   const dateOfBirth = req.body.dateOfBirth
   const dateOfBirthString = new Date(`${dateOfBirth.year}-${dateOfBirth.month + 1}-${dateOfBirth.day}`)
   const gender = req.body.gender
   console.log(dateOfBirthString)

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      await UserModel.checkRegisterEmail(email)
      const hashedPassword = await UserModel.encryptPassword(nativePassword)
      await UserModel.create({
         email,
         firstName,
         sureName,
         password: hashedPassword,
         dateOfBirth: dateOfBirthString,
         gender,
      })
      res.status(201).json({
         sureName,
         firstName,
         email,
         message: 'A regisztráció sikeres volt',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}
