import { ChatModel } from '../../models/chat/chatModel'
import { Response } from 'express'
import BaseLikeController from '../Base/BaseLikeController'

import type { ILikeDeleteRequest } from './Types/Types'

export default class DeleteLikeChatController extends BaseLikeController {
   deleteLikeController = async (request: ILikeDeleteRequest, response: Response) => {
      const { chatId, messageId, likeIdToDelete } = request.body
      const userId = request.user?.userId
      try {
         const updatedReaction = await ChatModel.updateOne(
            {
               _id: chatId,
               messages: {
                  $elemMatch: { _id: messageId, 'reaction._id': likeIdToDelete, 'likes.userId': userId },
               },
            },
            {
               $pull: {
                  'messages.$[outer].reaction': { _id: likeIdToDelete, userId },
               },
            },
            {
               arrayFilters: [{ 'outer._id': messageId }],
               upsert: true,
            }
         )

         response.status(200).json({ updatedReaction })
      } catch (error) {
         response.status(500).json(error)
      }
   }
}
