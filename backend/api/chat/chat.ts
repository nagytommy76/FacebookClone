import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { createNewChatController } from '../../controllers/chat/chat'
import { saveChatMessageController } from '../../controllers/chat/chatMessages'
import { getChatMessageLabels } from '../../controllers/chat/getChats'

const router = Router()

router.get('/get-all-chats', authenticateAccessTokenForApi, getChatMessageLabels)

router.post('/add-chat-msg', authenticateAccessTokenForApi, saveChatMessageController)
router.post('/create-chat', authenticateAccessTokenForApi, createNewChatController)

module.exports = router
