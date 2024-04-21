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
      })

      if (foundChat === null) {
         const createdChatModel = await ChatModel.create({
            participants: [{ participant: chatUserId }, { participant: loggedInUserId }],
            messages: [],
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

interface ISaveChatMsgType extends IJWTUserType {
   body: {
      chatId: string | null
      chatMsg: string
      chatUserId: string
   }
}
export const saveChatMessageController = async (request: ISaveChatMsgType, response: Response) => {
   const { chatId, chatMsg, chatUserId } = request.body
   try {
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
      const foundChat = await ChatModel.findOne({
         participants: { $all: [{ participant: chatWithUserId }, { participant: userId }] },
      })
      response.status(200).json(foundChat)
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
