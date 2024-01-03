import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getNotifications = async (request: IJWTUserType, response: Response) => {
   try {
      const userId = request.user?.userId
      const user = await UserModel.findById(userId).select('notifications')

      response
         .status(200)
         .json({ notifications: user?.notifications.length === 0 ? null : user?.notifications })
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
      response.status(200).json({ foundUsersNotification })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}

export const removeUsersNotification = async (request: IRemoveNotidication, response: Response) => {
   const userId = request.user?.userId
   const notificationId = request.body.notificationId
   try {
      const foundUser = await UserModel.findById(userId).select('notifications')
      if (!foundUser) return response.status(404).json({ msg: 'User not found' })

      foundUser.notifications = foundUser.notifications.filter(
         (notification) => notification._id != notificationId
      )
      await foundUser.save()
      return response.status(200).json({ notificationId, foundUser })
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
