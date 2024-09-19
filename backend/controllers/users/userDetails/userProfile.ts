import { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { User as UserModel } from '../../../models/user/user'

export const addNewWorkplaceController = async (request: Request, response: Response) => {
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

interface IRemoveWork extends Request {
   body: {
      workId: string
   }
}

export const removeSingleWorkplace = async (request: IRemoveWork, response: Response) => {
   const { workId } = request.body
   const userId = request.user?.userId
   try {
      const foundUsersWorkplaces = await UserModel.findOne({ _id: userId }).select('userDetails.workPlaces')
      if (!foundUsersWorkplaces) return response.status(404).json({ msg: 'User not found' })
      const removedWorkPlace = foundUsersWorkplaces.userDetails.workPlaces.filter(
         (work) => work._id != workId
      )

      foundUsersWorkplaces.userDetails.workPlaces = removedWorkPlace
      foundUsersWorkplaces.save()

      return response.status(200).json({ msg: 'deleted' })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
