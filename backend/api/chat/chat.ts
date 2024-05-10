import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { createNewChatController } from '../../controllers/chat/chat'
import { saveChatMessageController, setMessagesRead } from '../../controllers/chat/chatMessages'
import { getChatMessageLabels } from '../../controllers/chat/getChats'
import { deleteMessageController } from '../../controllers/chat/removeMessage'

const router = Router()

router.get('/get-all-chats', authenticateAccessTokenForApi, getChatMessageLabels)

router.post('/add-chat-msg', authenticateAccessTokenForApi, saveChatMessageController)
router.post('/create-chat', authenticateAccessTokenForApi, createNewChatController)

router.put('/set-read-messages', authenticateAccessTokenForApi, setMessagesRead)

router.patch('/delete-message', authenticateAccessTokenForApi, deleteMessageController)

module.exports = router
