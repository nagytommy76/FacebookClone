import { ChatModel } from '../../models/chat/chatModel'
import { Response } from 'express'
import type { IDeletChatRequest } from './Types/Types'

export const deleteChatController = async (request: IDeletChatRequest, response: Response) => {
   const { chatId } = request.body
   try {
      const deletedChat = await ChatModel.deleteOne({ _id: chatId })
      response.status(200).json({ deletedChat })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
