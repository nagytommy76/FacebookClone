import { Response } from 'express'
import { validationResult } from 'express-validator'
import { User as UserModel } from '../../../models/user/user'
import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'

export const addNewWorkplaceController = async (request: IJWTUserType, response: Response) => {
   try {
      const { city, company, post, endDateChecked, fromDate, toDate } = request.body as {
         company: string
         post: string
         city: string
         endDateChecked: boolean
         fromDate: Date | undefined
         toDate: Date | undefined
      }

      const result = validationResult(request)
      if (!result.isEmpty()) {
         return response.status(404).json({ errors: result.array() })
      }

      // console.log(toDate)
      response.status(200).json({ fromDate, toDate })
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
