import { ChatModel } from '../../models/chat/chatModel'
import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

interface ICreateChatRequest extends IJWTUserType {
   body: {
      chatUserId: string
   }
}

export const createNewChatController = async (request: ICreateChatRequest, response: Response) => {
   const chatUserId = request.body.chatUserId
   const loggedInUserId = request.user?.userId
   try {
      const foundChat = await ChatModel.findOne({
         $and: [{ 'participants.participant': chatUserId }, { 'participants.participant': loggedInUserId }],
      }).populate({
         path: 'participants.participant',
         select: ['_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })

      if (foundChat === null) {
         const createdChatModel = await ChatModel.create({
            participants: [{ participant: chatUserId }, { participant: loggedInUserId }],
            messages: [],
         })
         createdChatModel.populate({
            path: 'participants.participant',
            select: ['_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         return response.status(201).json({ createdChatModel })
      } else {
         return response.status(200).json({ createdChatModel: foundChat, msg: 'Chat already exist' })
      }
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
