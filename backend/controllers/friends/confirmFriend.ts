import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IMakeFriends } from './Types'

export const confirmFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId

   try {
      const foundSender = await UserModel.findOne({
         _id: loggedInUserId,
         friends: { $elemMatch: { friend: { $eq: friendId } } },
      }).select(['friends.$', 'firstName', 'sureName', 'notifications', 'userDetails.profilePicturePath'])

      const foundReceiver = await UserModel.findOne({
         _id: friendId,
         friends: { $elemMatch: { friend: { $eq: loggedInUserId } } },
      }).select(['friends.$', 'firstName', 'sureName', 'notifications'])

      if (!foundReceiver) return response.status(404)
      if (!foundSender) return response.status(404)

      foundReceiver.friends[0].status = 'friends'
      foundSender.friends[0].status = 'friends'

      foundSender.notifications.push({
         createdAt: new Date(),
         isRead: false,
         notificationType: 'isFriendConfirm',
         userDetails: {
            firstName: foundSender.firstName,
            sureName: foundSender.sureName,
            userId: foundSender._id,
            profilePicture: foundSender.userDetails.profilePicturePath[0].path,
         },
      })

      await foundSender.save()
      await foundReceiver.save()

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(friendId) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('confirmFriendship', {
               notifications: foundSender.notifications,
               userFriends: foundSender.friends[0],
            })
         }
      }

      response.status(200).json({
         receiverFriendId: foundReceiver.friends[0].friend,
         receiverFriends: foundReceiver.friends[0],
      })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
