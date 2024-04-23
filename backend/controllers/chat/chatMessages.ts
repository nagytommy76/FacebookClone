import { ChatModel } from '../../models/chat/chatModel'
import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

interface ISaveChatMsgType extends IJWTUserType {
   body: {
      chatId: string | null
      chatMsg: string
      selectedChatWithUserId: string
   }
}
export const saveChatMessageController = async (request: ISaveChatMsgType, response: Response) => {
   const { chatId, chatMsg, selectedChatWithUserId } = request.body
   try {
      const foundChat = await ChatModel.findOne({
         _id: chatId,
      })
      if (!foundChat) return response.status(404).json({ msg: 'ChatModel not found' })
      foundChat.messages.push({
         message: chatMsg,
         receiverUserId: selectedChatWithUserId,
      })
      response.status(200).json({ message: chatMsg, addedMessages: foundChat.messages })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
