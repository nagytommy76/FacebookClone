import { ChatModel } from '../../models/chat/chatModel'
import { Response } from 'express'
import BaseLikeController from '../Base/BaseLikeController'

import type { ILikeChatMsgRequest, IMessageLikeCountRequest } from './Types/Types'

export default class LikeChatController extends BaseLikeController {
   likeMessageController = async (request: ILikeChatMsgRequest, response: Response) => {
      const { likeType, messageId, chatId } = request.body
      const userId = request.user?.userId as string
      try {
         const foundSingleMessage = await ChatModel.findOne({
            _id: chatId,
         }).select(['messages'])
         if (!foundSingleMessage) return response.status(404).json({ msg: 'Messages not found' })

         const foundMessageIndex = foundSingleMessage.messages.findIndex(
            (message) => message._id == messageId
         )

         const userHasLike = this.findUsersLikeByUserID(
            foundSingleMessage.messages[foundMessageIndex].reaction,
            userId
         )
         this.checkUserLike(
            userHasLike,
            likeType,
            foundSingleMessage.messages[foundMessageIndex].reaction,
            userId
         )

         await foundSingleMessage.save()

         response.status(200).json({
            modifiedReaction: foundSingleMessage.messages[foundMessageIndex].reaction,
            foundMessageIndex,
         })
      } catch (error) {
         console.log(error)
         response.status(500).json(error)
      }
   }

   getMsgReactionByTypeAndCountController = async (request: IMessageLikeCountRequest, response: Response) => {
      const { messageId, chatId } = request.query
      try {
         const foundMessage = await ChatModel.findOne({
            _id: chatId,
            messages: { $elemMatch: { _id: messageId } },
         })
            .select(['messages.$'])
            .populate({
               path: 'messages.reaction.userId',
               select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })

         if (!foundMessage) return response.status(404).json({ msg: 'message not found' })

         const reactionTypes = this.getLikesByReactionType(foundMessage.messages[0].reaction)
         const totalReactionCount = this.countLikeReactions(reactionTypes)

         response.status(200).json({ reactionTypes, totalReactionCount })
      } catch (error) {
         console.log(error)
         response.status(500).json(error)
      }
   }
}
