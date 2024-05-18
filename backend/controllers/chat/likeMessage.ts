import { ChatModel } from '../../models/chat/chatModel'
import { Response } from 'express'

import type { ILikeChatMsgRequest } from './Types/Types'

export const likeMessageController = async (request: ILikeChatMsgRequest, response: Response) => {
   const { likeType, messageId, chatId } = request.body
   try {
      const foundSingleMessage = await ChatModel.findOne({
         _id: chatId,
         messages: { $elemMatch: { _id: messageId } },
      }).select(['messages.$'])

      response.status(200).json(foundSingleMessage)
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
