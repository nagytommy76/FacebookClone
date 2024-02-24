import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import type { IRegisterRequest } from './types/requestTypes'

export const registerUserController = async (req: IRegisterRequest, res: Response) => {
   const sureName = req.body.sureName
   const firstName = req.body.firstName
   const email = req.body.email
   const nativePassword = req.body.password
   const dateOfBirth = req.body.dateOfBirth
   const dateOfBirthString = new Date(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day)
   const gender = req.body.gender

   try {
      const hashedPassword = await UserModel.encryptPassword(nativePassword)
      await UserModel.create({
         email,
         firstName,
         sureName,
         password: hashedPassword,
         userDetails: {
            dateOfBirth: dateOfBirthString,
            gender,
         },
      })
      res.status(201).json({
         message: 'A regisztráció sikeres volt',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}
