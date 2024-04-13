import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { saveChatController, getUsersChatMessagesController } from '../../controllers/chat/chat'

const router = Router()

router.get('/get-user-chat', authenticateAccessTokenForApi, getUsersChatMessagesController)

router.post('/add-chat-msg', authenticateAccessTokenForApi, saveChatController)

module.exports = router
