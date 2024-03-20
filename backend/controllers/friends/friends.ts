import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { FriendsModel } from '../../models/friends/friends'
import { IMakeFriends } from './Types'

export const makeFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId
   try {
      const senderUser = await UserModel.findOne({
         _id: loggedInUserId,
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      }).select(['friends', 'firstName', 'sureName', 'notifications', 'userDetails.profilePicturePath.$'])

      const receiverUser = await UserModel.findOne({ _id: friendId }).select([
         'friends',
         'firstName',
         'sureName',
         'notifications',
      ])

      if (!senderUser) return response.status(404).json({ msg: 'Sender user not found' })
      if (!receiverUser) return response.status(404).json({ msg: 'Receiver user not found' })
      await FriendsModel.create({
         receiverUser: receiverUser._id,
         senderUser: senderUser._id,
         status: 'pending',
      })

      senderUser.friends.push(receiverUser._id)
      receiverUser.friends.push(senderUser._id)

      receiverUser.notifications.push({
         createdAt: new Date(),
         isRead: false,
         notificationType: 'isFriend',
         userDetails: {
            firstName: senderUser.firstName,
            sureName: senderUser.sureName,
            userId: senderUser._id,
            profilePicture: senderUser.userDetails.profilePicturePath[0].path,
         },
      })

      await receiverUser.save()
      await senderUser.save()

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(friendId) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('makeFriendship', {
               notifications: receiverUser.notifications,
               userFriends: receiverUser.friends,
            })
         }
      }

      response.status(200).json({ senderUser, receiverUser })
   } catch (error) {
      console.log(error)
      response.json(500).json(error)
   }
}

export const removeFriendRequestController = async () => {}
