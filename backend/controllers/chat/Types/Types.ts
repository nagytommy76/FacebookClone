import type { LikeTypes } from '../../posts/types/PostTypes'
import type { Request } from 'express'

export interface ILikeChatMsgRequest extends Request {
   body: {
      messageId: string
      chatId: string
      likeType: LikeTypes
   }
}

export interface IMessageLikeCountRequest extends Request {
   query: {
      messageId: string
      chatId: string
   }
}

export interface ILikeDeleteRequest extends Request {
   body: {
      messageId: string
      chatId: string
      likeIdToDelete: string
   }
}

export interface IDeletChatRequest extends Request {
   body: {
      chatId: string
   }
}
