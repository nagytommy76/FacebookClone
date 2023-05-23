import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { getOwnPostsController, getAllPosts } from '../../controllers/posts/getPosts'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { likePostController, deleteLikeFromPostController } from '../../controllers/posts/likePost'
import { savePostComment } from '../../controllers/posts/postComment'

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-posts', authenticateAccessTokenForApi, getAllPosts)
router.get('/get-own-post', authenticateAccessTokenForApi, getOwnPostsController)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

// Likolás
router.post('/post-like', authenticateAccessTokenForApi, likePostController)
router.post('/post-comment-add', authenticateAccessTokenForApi, savePostComment)

// Törlés
router.delete('/post-like-delete', authenticateAccessTokenForApi, deleteLikeFromPostController)

module.exports = router
