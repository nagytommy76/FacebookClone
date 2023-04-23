import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { getOwnPostsController } from '../../controllers/posts/getPosts'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { likePostController } from '../../controllers/posts/likePost'

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-own-post', authenticateAccessTokenForApi, getOwnPostsController)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

// Likolás
router.post('/post-like', authenticateAccessTokenForApi, likePostController)

module.exports = router
