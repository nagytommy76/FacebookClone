import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { deleteLikeFromPostController } from '../../controllers/posts/likePost'
import { savePostComment } from '../../controllers/posts/postComment'
import { removeCommentController, removeCommentAnswerController } from '../../controllers/posts/removeComment'
import { updateCommentController, updateCommentAnswerController } from '../../controllers/posts/updateComment'

import PostCommentController from '../../controllers/posts/postComment'
import GetPostsController from '../../controllers/posts/getPosts'
import LikePost from '../../controllers/posts/likePost'

const PostComment = new PostCommentController()
const GetPosts = new GetPostsController()
const LikePostClass = new LikePost()

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-posts', authenticateAccessTokenForApi, GetPosts.getAllPosts)
router.get('/get-user-posts', authenticateAccessTokenForApi, GetPosts.getUsersAllPosts)
router.post(
   '/get-post-like-count',
   authenticateAccessTokenForApi,
   LikePostClass.getPostLikesByTypeAndCountController
)
router.post(
   '/get-comment-like-count',
   authenticateAccessTokenForApi,
   LikePostClass.getPostCommentsLikesByTypeAndCountController
)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

// Likolás
router.post('/post-like', authenticateAccessTokenForApi, LikePostClass.likePostController)
router.post('/post-comment-add', authenticateAccessTokenForApi, savePostComment)
router.post('/post-comment-like', authenticateAccessTokenForApi, PostComment.likeCommentController)
router.post('/add-comment-answer', authenticateAccessTokenForApi, PostComment.answerToCommentController)

// Módosítás
router.put('/update-post-comment', authenticateAccessTokenForApi, updateCommentController)
router.put('/update-post-comment-answer', authenticateAccessTokenForApi, updateCommentAnswerController)

// Törlés
router.delete('/post-like-delete', authenticateAccessTokenForApi, deleteLikeFromPostController)
router.delete('/post-comment-delete', authenticateAccessTokenForApi, removeCommentController)
router.delete('/post-comment-answer-delete', authenticateAccessTokenForApi, removeCommentAnswerController)

module.exports = router
