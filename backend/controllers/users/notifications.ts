import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getNotifications = async (request: IJWTUserType, response: Response) => {
   try {
      const userId = request.user?.userId
      const user = await UserModel.findById(userId).select('notifications')

      response.status(200).json({ notifications: user?.notifications })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
