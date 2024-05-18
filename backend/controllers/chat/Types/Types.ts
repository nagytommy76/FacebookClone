import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'
import type { LikeTypes } from '../../posts/types/PostTypes'

export interface ILikeChatMsgRequest extends IJWTUserType {
   body: {
      messageId: string
      chatId: string
      likeType: LikeTypes
   }
}
