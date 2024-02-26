import { Response, Request } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IMakeFriends } from './Types'

// https://www.mongodb.com/docs/manual/reference/operator/aggregation/filter/
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
export const getUsers = async (request: Request, response: Response) => {
   try {
      const users = await UserModel.aggregate([
         {
            $addFields: {
               dateOfBirth: { $add: ['$userDetails.dateOfBirth'] },
            },
         },
         {
            $project: {
               firstName: 1,
               sureName: 1,
               email: 1,
               createdAt: 1,
               friends: 1,
               dateOfBirth: 1,
               selectedProfilePicture: {
                  $filter: {
                     input: '$userDetails.profilePicturePath',
                     as: 'profilePic',
                     cond: { $eq: ['$$profilePic.isSelected', true] },
                  },
               },
               lastWorkPlace: {
                  $filter: {
                     input: '$userDetails.workPlaces',
                     as: 'workPlace',
                     cond: { $eq: ['$$workPlace.endDate', null] },
                  },
               },
            },
         },
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

      console.log(senderUser.userDetails.profilePicturePath[0].path)

      senderUser.friends.push({
         createdAt: new Date(),
         userId: receiverUser.id,
         isAccepted: true,
         isSender: true,
         isReceiver: false,
      })

      receiverUser.friends.push({
         createdAt: new Date(),
         userId: senderUser._id,
         isAccepted: false,
         isSender: false,
         isReceiver: true,
      })
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

      response.status(200).json({ senderUser, receiverUser })
   } catch (error) {
      console.log(error)
      response.json(500).json(error)
   }
}

export const removeFriendRequestController = async () => {}
