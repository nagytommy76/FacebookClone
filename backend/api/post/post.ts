import { Router } from 'express'
import { savePostController, savePostImageController } from '../../controllers/posts/savePost'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { savePostComment } from '../../controllers/posts/postComment'
import { removeCommentController, removeCommentAnswerController } from '../../controllers/posts/removeComment'

import GetCommentController from '../../controllers/posts/comment/getComments'
import PostCommentController from '../../controllers/posts/postComment'
import GetPostsController from '../../controllers/posts/getPosts'
import LikePost from '../../controllers/posts/like/likePost'
import CommentLikeController from '../../controllers/posts/like/likeComment'
import DeleteLikePost from '../../controllers/posts/like/delete/deletePostLike'
import DeleteCommentLike from '../../controllers/posts/like/delete/deleteCommentLike'
import DeleteAnswerLike from '../../controllers/posts/like/delete/deleteAnswerLike'
import RemovePostsController from '../../controllers/posts/removePost'

const GetCommentControllerClass = new GetCommentController()
const LikePostClass = new LikePost()
const CommentLikeControllerClass = new CommentLikeController()
const PostComment = new PostCommentController()
const GetPosts = new GetPostsController()
const DeleteLike = new DeleteLikePost()
const DeleteCommentLikeClass = new DeleteCommentLike()
const DeleteAnswerLikeClass = new DeleteAnswerLike()
const RemovePostsClass = new RemovePostsController()

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.get('/get-posts', authenticateAccessTokenForApi, GetPosts.getAllPosts)
router.get('/get-user-posts', authenticateAccessTokenForApi, GetPosts.getUsersAllPosts)
router.post('/save-post', authenticateAccessTokenForApi, savePostController)
router.put('/save-post-image', authenticateAccessTokenForApi, savePostImageController)

// Komment
router.get(
   '/get-post-comments',
   authenticateAccessTokenForApi,
   GetCommentControllerClass.getCommentsController
)
router.post('/post-comment-add', authenticateAccessTokenForApi, savePostComment)
router.post('/add-comment-answer', authenticateAccessTokenForApi, PostComment.answerToCommentController)

// Like COUNT ----------------------------------------------------------
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
router.post(
   '/get-answer-like-count',
   authenticateAccessTokenForApi,
   LikePostClass.getPostCommentAnswersLikesByTypeAndCountController
)
// Likeolás ----------------------------------------
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

// LIKE TÖRLÉS ----------------------------------
router.delete('/post-delete', authenticateAccessTokenForApi, RemovePostsClass.removePostController)

router.delete('/post-like-delete', authenticateAccessTokenForApi, DeleteLike.deleteLikeFromPostController)
router.delete(
   '/post-comment-like-delete',
   authenticateAccessTokenForApi,
   DeleteCommentLikeClass.deleteLikeCommentController
)
router.delete(
   '/post-answer-like-delete',
   authenticateAccessTokenForApi,
   DeleteAnswerLikeClass.deleteLikeAnswerController
)

// KOMMENT TÖRLÉS -------------------
router.delete('/post-comment-delete', authenticateAccessTokenForApi, removeCommentController)
router.delete('/post-comment-answer-delete', authenticateAccessTokenForApi, removeCommentAnswerController)

module.exports = router
