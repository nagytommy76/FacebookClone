import { ChatModel } from '../../models/chat/chatModel'
import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getChatMessageLabels = async (request: IJWTUserType, response: Response) => {
   const loggedInUserId = request.user?.userId
   try {
      const foundChat = await ChatModel.find({
         $in: [{ 'participants.participant': loggedInUserId }],
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      }).populate({
         path: 'participants.participant',
         select: ['_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })

      response.status(200).json({ foundChat })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
