import { Response } from 'express'
import { User as UserModel } from '../../../models/user/user'
import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'

export const addNewWorkplaceController = async (request: IJWTUserType, response: Response) => {
   try {
      const { city, fromDate, toDate } = request.body as {
         company: string
         post: string
         city: string
         fromDate: Date | undefined
         toDate: Date | undefined
      }
      console.log(toDate)
      response.status(200).json({ fromDate, toDate })
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
