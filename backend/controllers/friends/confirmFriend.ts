import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IMakeFriends } from './Types'

export const confirmFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId

   try {
      const foundReceiver = await UserModel.findOne({ _id: loggedInUserId })
      const foundSender = await UserModel.findOne({ _id: friendId })

      if (!foundReceiver) return response.status(404)
      const foundFriendIndex = foundReceiver.friends.findIndex((friend) => friend.senderUserId == friendId)

      if (foundFriendIndex === -1) return response.status(404)
      foundReceiver.friends[foundFriendIndex].isAccepted = true

      foundSender?.notifications.push({
         createdAt: new Date(),
         isRead: false,
         notificationType: 'isFriend',
         userDetails: {
            firstName: foundReceiver.firstName,
            sureName: foundReceiver.sureName,
            userId: foundReceiver._id,
            profilePicture: foundReceiver.userDetails.profilePicturePath[0].path,
         },
      })

      //   await foundReceiver.save()

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(friendId) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('confirmFriendship', {
               notifications: foundReceiver.notifications,
               userFriends: foundReceiver.friends,
            })
         }
      }

      response.status(200).json({
         foundFriend: foundReceiver.friends[foundFriendIndex],
         foundSenderNotifi: foundSender?.notifications,
      })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
