import { Types } from 'mongoose'
import { ChatModel } from '../../models/chat/chatModel'
import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

interface ISaveChatRequest extends IJWTUserType {
   body: {
      chatMsg: string
      chatUserId: string
   }
}

export const saveChatController = (request: ISaveChatRequest, response: Response) => {
   const userId = request.user?.userId
   const { chatMsg, chatUserId } = request.body
   try {
      const createdChatModel = ChatModel.create({
         messages: [
            {
               userId,
               message: chatMsg,
               image: '',
            },
         ],
         participants: [userId, chatUserId],
      })
      response.status(200).json({ msg: 'minden ok', createdChatModel })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}

interface IGetUsersChatRequest extends IJWTUserType {
   query: {
      chatWithUserId: string
   }
}

export const getUsersChatMessagesController = async (request: IGetUsersChatRequest, response: Response) => {
   const userId = request.user?.userId
   const chatWithUserId = request.query.chatWithUserId

   console.log(chatWithUserId)
   console.log(userId)
   try {
      const foundChat = await ChatModel.findOne({ participants: { $all: [userId, chatWithUserId] } })
      response.status(200).json(foundChat)
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
