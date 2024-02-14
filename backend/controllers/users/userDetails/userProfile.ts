import { Response } from 'express'
import { validationResult } from 'express-validator'
import { User as UserModel } from '../../../models/user/user'
import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'

export const addNewWorkplaceController = async (request: IJWTUserType, response: Response) => {
   const result = validationResult(request)
   if (!result.isEmpty()) {
      return response.status(404).json({ errors: result.array() })
   }
   try {
      const userId = request.user?.userId
      const { city, company, post, description, endDateChecked, fromDate, toDate } = request.body as {
         company: string
         post: string
         city: string
         description: string
         endDateChecked: boolean
         fromDate: string
         toDate: string | undefined
      }

      const savedUserWorlplace = await UserModel.findById(userId).select('userDetails.workPlaces')
      savedUserWorlplace?.userDetails.workPlaces.push({
         city,
         companyName: company,
         description,
         position: post,
         startDate: fromDate,
         endDate: toDate || null,
      })
      const saved = await savedUserWorlplace?.save()

      response.status(200).json({ savedUserWorlplace: savedUserWorlplace?.userDetails.workPlaces, saved })
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
