import { Response, Request } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IMakeFriends } from './Types'

export const getUsers = async (request: Request, response: Response) => {
   try {
      const users = await UserModel.find({
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      }).select([
         'firstName',
         'sureName',
         'email',
         'createdAt',
         'userDetails.profilePicturePath.$',
         'friends',
      ])

      return response.status(200).json(users)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}

export const makeFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId

   try {
      const senderUser = await UserModel.getUserByUserIdAndSelect(loggedInUserId)
      const receiverUser = await UserModel.findOne({ _id: friendId }).select([
         'friends',
         'firstName',
         'sureName',
         'notifications',
      ])
      if (!senderUser) return response.status(404).json({ msg: 'Sender user not found' })
      if (!receiverUser) return response.status(404).json({ msg: 'Receiver user not found' })

      senderUser.friends.push({
         createdAt: new Date(),
         isAccepted: true,
         userId: receiverUser.id,
      })

      receiverUser.friends.push({
         createdAt: new Date(),
         isAccepted: false,
         userId: senderUser.id,
      })
      receiverUser.notifications.push({
         createdAt: new Date(),
         isRead: false,
         notificationType: 'isFriend',
         userDetails: {
            firstName: senderUser.firstName,
            sureName: senderUser.sureName,
            userId: senderUser.id,
            profilePicture: senderUser.userDetails.profilePicturePath[0].path,
         },
      })

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(friendId) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('makeFriendship', {
               notifications: receiverUser.notifications,
            })
         }
      }

      await receiverUser.save()
      await senderUser.save()

      response.status(200).json({ msg: 'makeFriendship', senderUser, receiverUser })
   } catch (error) {
      console.log(error)
      response.json(500).json(error)
   }
}

export const removeFriendRequestController = async () => {}
