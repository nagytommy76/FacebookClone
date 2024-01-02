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

export const setActiveNotifications = async (request: IJWTUserType, response: Response) => {
   try {
      const userId = request.user?.userId
      const notificationId = request.body.notificationId as string

      const foundUsersNotification = await UserModel.updateOne(
         {
            _id: userId,
            notifications: { $elemMatch: { _id: notificationId } },
         },
         {
            $set: {
               'notifications.$.isRead': true,
            },
         }
      )
      response.status(200).json({ csá: 'csá', foundUsersNotification })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}

export const removeUsersNotification = async (request: IRemoveNotidication, response: Response) => {
   const userId = request.user?.userId
   const notificationId = request.body.notificationId
   try {
      await UserModel.updateOne({
         _id: userId,
         notifications: {
            $elemMatch: { _id: notificationId },
         },
      })

      return response.status(201)
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}

interface IRemoveNotidication extends IJWTUserType {
   body: {
      notificationId: string
   }
}
