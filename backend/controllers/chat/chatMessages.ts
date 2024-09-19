import { ChatModel } from '../../models/chat/chatModel'
import type { Response, Request } from 'express'

interface ISaveChatMsgType extends Request {
   body: {
      chatId: string
      chatMsg: string
      selectedChatWithUserId: string
      chatImagePath: string | undefined
   }
}
export const saveChatMessageController = async (request: ISaveChatMsgType, response: Response) => {
   const { chatId, chatMsg, chatImagePath, selectedChatWithUserId } = request.body
   try {
      const foundChat = await ChatModel.findOne({
         _id: chatId,
      })
      if (!foundChat) return response.status(404).json({ msg: 'ChatModel not found' })
      foundChat.messages.push({
         createdAt: new Date(),
         updatedAt: new Date(),
         message: chatMsg,
         receiverUserId: selectedChatWithUserId,
         image: chatImagePath,
         reaction: [],
      })

      await foundChat.save()

      response.status(200).json({
         message: chatMsg,
         addedMessages: foundChat.messages[foundChat.messages.length - 1],
         foundChatId: foundChat._id,
      })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}

interface IMessagesRead extends Request {
   body: {
      currentChatId: string
   }
}

export const setMessagesRead = async (request: IMessagesRead, response: Response) => {
   const loggedInUserId = request.user?.userId
   const { currentChatId } = request.body
   try {
      const foundUsersMessages = await ChatModel.findOne({
         _id: currentChatId,
      }).select('messages')
      if (!foundUsersMessages) return response.status(404).json({ msg: 'Chat not found' })

      foundUsersMessages.messages = foundUsersMessages.messages.map((message) => {
         if (message.receiverUserId == loggedInUserId) {
            message.isRead = true
         }
         return message
      })

      await foundUsersMessages.save()

      response.status(200).json({ totalUnreadMsgCount: 0 })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
