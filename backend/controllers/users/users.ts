import { Response } from 'express'
import { IRegisterRequest, ILoginRequest } from './Types'

import { User as UserModel } from '../../models/user/user'

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
         dateOfBirth: dateOfBirthString,
         gender,
      })
      res.status(201).json({
         message: 'A regisztráció sikeres volt',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

export const loginUserController = async (req: ILoginRequest, res: Response) => {
   const { email, password } = req.body
   try {
      const { foundUser, isPasswordCorrect } = await UserModel.comparePassword(email, password)
      if (!isPasswordCorrect)
         return res.status(403).json(errorResponse(true, 'Helytelen jelszó!', 'password'))
      // console.log(foundUser.email)
      return res.status(200).json({ msg: 'Sikeres belépés!!!', isPasswordCorrect })
   } catch (error) {
      res.status(500).json(error)
   }
}

const errorResponse = (isError: boolean, msg: string, param: string, value: string = '') => {
   return {
      errors: [
         {
            isError,
            msg,
            param,
            value,
         },
      ],
   }
}
