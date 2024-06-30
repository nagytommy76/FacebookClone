import { Response } from 'express'
import { Types } from 'mongoose'

import { ChatModel } from '../../models/chat/chatModel'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const aggregateMessageLabels = async (loggedInUserId: Types.ObjectId, chatId?: Types.ObjectId) => {
   const foundChat = await ChatModel.aggregate([
      {
         $match: {
            'participants.participant': loggedInUserId,
         },
      },
      {
         $lookup: {
            from: 'users',
            localField: 'participants.participant',
            foreignField: '_id',
            as: 'chatWithParticipant',
            pipeline: [
               {
                  $match: {
                     _id: { $ne: loggedInUserId },
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
                  },
               },
            ],
         },
      },
      {
         $addFields: {
            totalUnreadMsgCount: {
               $sum: {
                  $size: {
                     $filter: {
                        input: '$messages',
                        as: 'message',
                        cond: {
                           $and: [
                              { $eq: ['$$message.isRead', false] },
                              { $eq: ['$$message.receiverUserId', loggedInUserId] },
                           ],
                        },
                     },
                  },
               },
            },
         },
      },
      {
         $unwind: {
            path: '$chatWithParticipant',
         },
      },
   ])
   return foundChat
}

export const getChatMessageLabels = async (request: IJWTUserType, response: Response) => {
   const loggedInUserId = new Types.ObjectId(request.user?.userId)
   try {
      const foundChat = await aggregateMessageLabels(loggedInUserId)
      response.status(200).json({ foundChat })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
