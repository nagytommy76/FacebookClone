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

const router = Router()

router.get('/get-all-chats', authenticateAccessTokenForApi, getChatMessageLabels)
router.get(
   '/get-message-like-count',
   authenticateAccessTokenForApi,
   LikeController.getMsgReactionByTypeAndCountController
)

router.post('/add-chat-msg', authenticateAccessTokenForApi, saveChatMessageController)
router.post('/create-chat', authenticateAccessTokenForApi, createNewChatController)
// Like
router.post('/like-message', authenticateAccessTokenForApi, LikeController.likeMessageController)

router.put('/set-read-messages', authenticateAccessTokenForApi, setMessagesRead)

router.patch('/delete-message', authenticateAccessTokenForApi, deleteMessageController)

router.delete('/delete-message-like', authenticateAccessTokenForApi, DeleteController.deleteLikeController)
router.delete('/delete-chat', authenticateAccessTokenForApi, deleteChatController)

module.exports = router
