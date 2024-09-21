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
import type SocketService from 'config/socketIo.config'

const GetCommentControllerClass = new GetCommentController()
const LikePostClass = new LikePost()
const CommentLikeControllerClass = new CommentLikeController()
const PostComment = new PostCommentController()
const GetPosts = new GetPostsController()
const DeleteLike = new DeleteLikePost()
const DeleteCommentLikeClass = new DeleteCommentLike()
const DeleteAnswerLikeClass = new DeleteAnswerLike()
const RemovePostsClass = new RemovePostsController()

export default class PostApi {
   public router
   private io: SocketService
   constructor(io: SocketService) {
      this.io = io
      this.router = Router()
      this.configureRoutes()
   }

   private configureRoutes() {
      // Ide kell egy api route protection (accessTokennel, middleware)
      this.router.get('/get-posts', authenticateAccessTokenForApi, GetPosts.getAllPosts)
      this.router.get('/get-user-posts', authenticateAccessTokenForApi, GetPosts.getUsersAllPosts)
      this.router.post('/save-post', authenticateAccessTokenForApi, savePostController)
      this.router.put('/save-post-image', authenticateAccessTokenForApi, savePostImageController)

      // Komment
      this.router.get(
         '/get-post-comments',
         authenticateAccessTokenForApi,
         GetCommentControllerClass.getCommentsController
      )
      this.router.post('/post-comment-add', authenticateAccessTokenForApi, (request, response) =>
         savePostComment(request, response, this.io)
      )
      this.router.post(
         '/add-comment-answer',
         authenticateAccessTokenForApi,
         PostComment.answerToCommentController
      )

      // Like COUNT ----------------------------------------------------------
      this.router.post(
         '/get-post-like-count',
         authenticateAccessTokenForApi,
         LikePostClass.getPostLikesByTypeAndCountController
      )
      this.router.post(
         '/get-comment-like-count',
         authenticateAccessTokenForApi,
         LikePostClass.getPostCommentsLikesByTypeAndCountController
      )
      this.router.post(
         '/get-answer-like-count',
         authenticateAccessTokenForApi,
         LikePostClass.getPostCommentAnswersLikesByTypeAndCountController
      )
      // Likeolás ----------------------------------------
      this.router.post('/post-like', authenticateAccessTokenForApi, LikePostClass.likePostController)
      this.router.post(
         '/post-comment-like',
         authenticateAccessTokenForApi,
         CommentLikeControllerClass.likeCommentController
      )
      this.router.post(
         '/comment-answer-like',
         authenticateAccessTokenForApi,
         CommentLikeControllerClass.likeCommentAnswerController
      )

      // LIKE TÖRLÉS ----------------------------------
      this.router.delete('/post-delete', authenticateAccessTokenForApi, RemovePostsClass.removePostController)

      this.router.delete(
         '/post-like-delete',
         authenticateAccessTokenForApi,
         DeleteLike.deleteLikeFromPostController
      )
      this.router.delete(
         '/post-comment-like-delete',
         authenticateAccessTokenForApi,
         DeleteCommentLikeClass.deleteLikeCommentController
      )
      this.router.delete(
         '/post-answer-like-delete',
         authenticateAccessTokenForApi,
         DeleteAnswerLikeClass.deleteLikeAnswerController
      )

      // KOMMENT TÖRLÉS -------------------
      this.router.delete('/post-comment-delete', authenticateAccessTokenForApi, removeCommentController)
      this.router.delete(
         '/post-comment-answer-delete',
         authenticateAccessTokenForApi,
         removeCommentAnswerController
      )
   }
}
