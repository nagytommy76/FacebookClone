import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

module.exports = router
