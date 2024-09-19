import { ChatModel } from '../../models/chat/chatModel'
import { Response, Request } from 'express'

interface IDeleteMessageRequest extends Request {
   body: {
      chatId: string
      messageId: string
   }
}

export const deleteMessageController = async (request: IDeleteMessageRequest, response: Response) => {
   const { chatId, messageId } = request.body
   try {
      const foundMessages = await ChatModel.findOne({
         _id: chatId,
      }).select('messages')
      if (!foundMessages) return response.status(404).json({ msg: 'Chat not found' })

      foundMessages.messages = foundMessages.messages.filter((message) => message._id != messageId)

      await foundMessages.save()

      response.status(200).json({ msg: 'Message Deleted', updatedMessages: foundMessages.messages })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
