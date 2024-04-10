import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { saveChatController } from '../../controllers/chat/chat'

const router = Router()

router.post('/add-chat-msg', authenticateAccessTokenForApi, saveChatController)

module.exports = router
