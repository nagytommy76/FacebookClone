import { ChatModel } from '../../models/chat/chatModel'
import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getChatMessageLabels = async (request: IJWTUserType, response: Response) => {
   const loggedInUserId = request.user?.userId
   try {
      const foundChat = await ChatModel.find({
         $in: [{ 'participants.participant': loggedInUserId }],
      }).populate({
         path: 'participants.participant',
         select: ['_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })

      // const foundChat1 = await ChatModel.aggregate([
      //    {
      //       // $match: { 'participants.participant': { loggedInUserId } },
      //       $match: {
      //          participants: {
      //             $all: [
      //                {
      //                   $elemMatch: {
      //                      participant: loggedInUserId,
      //                   },
      //                },
      //             ],
      //          },
      //       },
      //    },
      //    // {
      //    //    $project: {
      //    //       'participants.participant': '$participants.participant',
      //    //       testing: {
      //    //          $in: [loggedInUserId, '$participants.participant'],
      //    //       },
      //    //    },
      //    // },
      // ])

      response.status(200).json({ foundChat })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
