import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { getOwnPostsController } from '../../controllers/posts/getPosts'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-own-post', authenticateAccessTokenForApi, getOwnPostsController)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

module.exports = router
