import { Response, Request } from 'express'
import { User as UserModel } from '../../models/user/user'

export const getUsers = async (request: Request, response: Response) => {
   try {
      const users = await UserModel.find({
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      }).select(['firstName', 'sureName', 'email', 'createdAt', 'userDetails.profilePicturePath'])

      return response.status(200).json(users)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
