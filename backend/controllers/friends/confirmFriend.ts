import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { FriendsModel } from '../../models/friends/friends'
import { IMakeFriends } from './Types'

export const confirmFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId
   const connectedFriendId = request.body.connectedFriendId

   try {
      const foundFriendsModel = await FriendsModel.findOne({ _id: connectedFriendId })
      const foundReceiver = await UserModel.findOne({ _id: friendId })
      const foundSender = await UserModel.findOne({ _id: loggedInUserId })

      if (!foundReceiver) return response.status(404)
      if (!foundSender) return response.status(404)
      if (!foundFriendsModel) return response.status(404)

      foundFriendsModel.status = 'friends'

      foundSender.notifications.push({
         createdAt: new Date(),
         isRead: false,
         notificationType: 'isFriendConfirm',
         userDetails: {
            firstName: foundReceiver.firstName,
            sureName: foundReceiver.sureName,
            userId: foundReceiver._id,
            profilePicture: foundReceiver.userDetails.profilePicturePath[0].path,
         },
      })

      await foundSender.save()
      await foundFriendsModel.save()

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(friendId) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('confirmFriendship', {
               notifications: foundSender.notifications,
               userFriends: foundReceiver.friends,
               foundFriendsModel,
            })
         }
      }

      response.status(200).json({
         foundFriendsModel,
      })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
