import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { savePostComment } from '../../controllers/posts/postComment'
import { removeCommentController, removeCommentAnswerController } from '../../controllers/posts/removeComment'
import { updateCommentController, updateCommentAnswerController } from '../../controllers/posts/updateComment'

import PostCommentController from '../../controllers/posts/postComment'
import GetPostsController from '../../controllers/posts/getPosts'
import LikePost from '../../controllers/posts/like/likePost'
import CommentLikeController from '../../controllers/posts/like/likeComment'
import DeleteLikePost from '../../controllers/posts/like/delete/deletePostLike'
import DeleteCommentLike from '../../controllers/posts/like/delete/deleteCommentLike'

const LikePostClass = new LikePost()
const CommentLikeControllerClass = new CommentLikeController()
const PostComment = new PostCommentController()
const GetPosts = new GetPostsController()
const DeleteLike = new DeleteLikePost()
const DeleteCommentLikeClass = new DeleteCommentLike()

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-posts', authenticateAccessTokenForApi, GetPosts.getAllPosts)
router.get('/get-user-posts', authenticateAccessTokenForApi, GetPosts.getUsersAllPosts)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)

// Komment
router.post('/post-comment-add', authenticateAccessTokenForApi, savePostComment)
router.post('/add-comment-answer', authenticateAccessTokenForApi, PostComment.answerToCommentController)

// Likolás
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
router.post('/post-like', authenticateAccessTokenForApi, LikePostClass.likePostController)
router.post(
   '/post-comment-like',
   authenticateAccessTokenForApi,
   CommentLikeControllerClass.likeCommentController
)
router.post(
   '/comment-answer-like',
   authenticateAccessTokenForApi,
   CommentLikeControllerClass.likeCommentAnswerController
)

// Módosítás
router.put('/update-post-comment', authenticateAccessTokenForApi, updateCommentController)
router.put('/update-post-comment-answer', authenticateAccessTokenForApi, updateCommentAnswerController)

// TÖRLÉS ----------------------------------
router.delete('/post-like-delete', authenticateAccessTokenForApi, DeleteLike.deleteLikeFromPostController)
router.delete(
   '/post-comment-like-delete',
   authenticateAccessTokenForApi,
   DeleteCommentLikeClass.deleteLikeCommentController
)
// KOMMENT TÖRLÉS -------------------
router.delete('/post-comment-delete', authenticateAccessTokenForApi, removeCommentController)
router.delete('/post-comment-answer-delete', authenticateAccessTokenForApi, removeCommentAnswerController)

module.exports = router
