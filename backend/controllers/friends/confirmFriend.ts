import { Response } from 'express'
import { Types } from 'mongoose'
import { User as UserModel } from '../../models/user/user'
import type { IMakeFriends } from './Types'
import type { IFriends } from '../users/types/ModelTypes'

export const confirmFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = new Types.ObjectId(request.user?.userId)
   const friendId = new Types.ObjectId(request.body.friendId)

   try {
      await UserModel.updateOne(
         { _id: loggedInUserId, friends: { $elemMatch: { friend: { $eq: friendId } } } },
         { $set: { 'friends.$.status': 'friends', 'friends.$.friendSince': new Date() } }
      )

      const foundSender = await UserModel.aggregate<{
         _id: string
         firstName: string
         sureName: string
         selectedProfilePicture: [{ path: string }]
         foundFriend: IFriends[]
      }>([
         {
            $match: {
               _id: loggedInUserId,
            },
         },
         {
            $project: {
               firstName: 1,
               sureName: 1,
               selectedProfilePicture: {
                  $filter: {
                     input: '$userDetails.profilePicturePath',
                     as: 'profilePic',
                     cond: { $eq: ['$$profilePic.isSelected', true] },
                  },
               },
               foundFriend: {
                  $filter: {
                     input: '$friends',
                     as: 'friend',
                     cond: { $eq: ['$$friend.friend', friendId] },
                  },
               },
            },
         },
      ])

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
                     firstName: foundSender[0].firstName,
                     sureName: foundSender[0].sureName,
                     userId: foundSender[0]._id,
                     profilePicture: foundSender[0].selectedProfilePicture[0].path,
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
         const toSendUser = request.getUser(String(friendId)) as any
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('confirmFriendship', {
               notifications: foundReceiver?.notifications,
               userFriends: foundSender[0].foundFriend[0],
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
