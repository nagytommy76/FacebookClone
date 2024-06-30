import { ChatModel } from '../../models/chat/chatModel'
import { Types } from 'mongoose'
import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { aggregateMessageLabels } from './getChats'

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
      }).select('_id')

      if (foundChat === null) {
         const createdChatModel = await ChatModel.create({
            participants: [{ participant: chatUserId }, { participant: loggedInUserId }],
            messages: [],
         })
         const aggregatedChatLabels = await aggregateMessageLabels(
            new Types.ObjectId(loggedInUserId),
            new Types.ObjectId(createdChatModel._id)
         )

         return response.status(201).json({ createdChatModel: aggregatedChatLabels[0] })
      } else {
         return response.status(200).json({ createdChatModel: foundChat, msg: 'Chat already exist' })
      }
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
