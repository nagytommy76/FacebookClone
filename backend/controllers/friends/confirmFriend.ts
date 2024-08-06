import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IMakeFriends } from './Types'

export const confirmFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId

   try {
      await UserModel.updateOne(
         { _id: loggedInUserId, friends: { $elemMatch: { friend: { $eq: friendId } } } },
         { $set: { 'friends.$.status': 'friends', 'friends.$.friendSince': new Date() } }
      )
      const foundSender = await UserModel.findOne({
         _id: loggedInUserId,
         friends: { $elemMatch: { friend: { $eq: friendId } } },
      }).select(['friends.$', 'firstName', 'sureName', 'notifications', 'userDetails.profilePicturePath'])

      await UserModel.updateOne(
         { _id: friendId, friends: { $elemMatch: { friend: { $eq: loggedInUserId } } } },
         {
            $set: { 'friends.$.status': 'friends', 'friends.$.friendSince': new Date() },
            $push: {
               notifications: {
                  createdAt: new Date(),
                  isRead: false,
                  notificationType: 'isFriendConfirm',
                  userDetails: {
                     firstName: foundSender?.firstName,
                     sureName: foundSender?.sureName,
                     userId: foundSender?._id,
                     profilePicture: foundSender?.userDetails.profilePicturePath[0].path,
                  },
               },
            },
         }
      )

      const foundReceiver = await UserModel.findOne({
         _id: friendId,
         friends: { $elemMatch: { friend: { $eq: loggedInUserId } } },
      }).select(['friends.$', 'notifications'])

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(friendId) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('confirmFriendship', {
               notifications: foundReceiver?.notifications,
               userFriends: foundSender?.friends[0],
            })
         }
      }

      response.status(200).json({
         receiverFriendId: foundReceiver?.friends[0].friend,
         receiverFriends: foundReceiver?.friends[0],
      })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
