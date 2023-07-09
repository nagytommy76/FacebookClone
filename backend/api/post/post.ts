import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { getAllPosts, getCommentLikes } from '../../controllers/posts/getPosts'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import {
   likePostController,
   deleteLikeFromPostController,
   getLikesByTypeAndCountController,
} from '../../controllers/posts/likePost'
import { savePostComment } from '../../controllers/posts/postComment'
import PostCommentController from '../../controllers/posts/postComment'

const PostComment = new PostCommentController()

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-posts', authenticateAccessTokenForApi, getAllPosts)
router.get('/get-posts-test', authenticateAccessTokenForApi, getCommentLikes)
router.get('/get-like-count', authenticateAccessTokenForApi, getLikesByTypeAndCountController)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

// Likolás
router.post('/post-like', authenticateAccessTokenForApi, likePostController)
router.post('/post-comment-add', authenticateAccessTokenForApi, savePostComment)
router.post('/post-comment-like', authenticateAccessTokenForApi, PostComment.likeCommentController)
router.post('/add-comment-answer', authenticateAccessTokenForApi, PostComment.answerToCommentController)

// Törlés
router.delete('/post-like-delete', authenticateAccessTokenForApi, deleteLikeFromPostController)

module.exports = router
