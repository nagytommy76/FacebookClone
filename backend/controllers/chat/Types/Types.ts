import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'
import type { LikeTypes } from '../../posts/types/PostTypes'

export interface ILikeChatMsgRequest extends IJWTUserType {
   body: {
      messageId: string
      chatId: string
      likeType: LikeTypes
   }
}

export interface IMessageLikeCountRequest extends IJWTUserType {
   query: {
      messageId: string
      chatId: string
   }
}
