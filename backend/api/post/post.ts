import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { getAllPosts, getCommentLikes } from '../../controllers/posts/getPosts'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { likePostController, deleteLikeFromPostController } from '../../controllers/posts/likePost'
import { savePostComment, likeCommentController } from '../../controllers/posts/postComment'

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-posts', authenticateAccessTokenForApi, getAllPosts)
router.get('/get-posts-test', authenticateAccessTokenForApi, getCommentLikes)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

// Likolás
router.post('/post-like', authenticateAccessTokenForApi, likePostController)
router.post('/post-comment-add', authenticateAccessTokenForApi, savePostComment)
router.post('/post-comment-like', authenticateAccessTokenForApi, likeCommentController)

// Törlés
router.delete('/post-like-delete', authenticateAccessTokenForApi, deleteLikeFromPostController)

module.exports = router
