import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { createNewChatController } from '../../controllers/chat/chat'
import { saveChatMessageController, setMessagesRead } from '../../controllers/chat/chatMessages'
import { getChatMessageLabels } from '../../controllers/chat/getChats'
import { deleteMessageController } from '../../controllers/chat/removeMessage'
import { deleteChatController } from '../../controllers/chat/deleteChat'
import LikeChatController from '../../controllers/chat/likeMessage'
import DeleteLikeChatController from '../../controllers/chat/deleteLike'

const LikeController = new LikeChatController()
const DeleteController = new DeleteLikeChatController()

export default class ChatApi {
   public router

   constructor() {
      this.router = Router()
      this.configureRoutes()
   }

   public configureRoutes() {
      this.router.get('/get-all-chats', authenticateAccessTokenForApi, getChatMessageLabels)
      this.router.get(
         '/get-message-like-count',
         authenticateAccessTokenForApi,
         LikeController.getMsgReactionByTypeAndCountController
      )

      this.router.post('/add-chat-msg', authenticateAccessTokenForApi, saveChatMessageController)
      this.router.post('/create-chat', authenticateAccessTokenForApi, createNewChatController)
      // Like
      this.router.post('/like-message', authenticateAccessTokenForApi, LikeController.likeMessageController)

      this.router.put('/set-read-messages', authenticateAccessTokenForApi, setMessagesRead)

      this.router.patch('/delete-message', authenticateAccessTokenForApi, deleteMessageController)

      this.router.delete(
         '/delete-message-like',
         authenticateAccessTokenForApi,
         DeleteController.deleteLikeController
      )
      this.router.delete('/delete-chat', authenticateAccessTokenForApi, deleteChatController)
   }
}
