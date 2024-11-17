import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../../middlewares/accessTokenRefresh'
import {
   updateCommentAnswerController,
   updateCommentController,
} from '../../../controllers/posts/updateComment'
import { updatePostController } from '../../../controllers/posts/updatePost'

export default class ModifyPostApi {
   public router

   constructor() {
      this.router = Router()
      this.configureRoutes()
   }

   configureRoutes() {
      // POSZT
      this.router.put('/update-post', authenticateAccessTokenForApi, updatePostController)

      // Módosítás - KOMMENT
      this.router.put('/update-post-comment', authenticateAccessTokenForApi, updateCommentController)
      this.router.put(
         '/update-post-comment-answer',
         authenticateAccessTokenForApi,
         updateCommentAnswerController
      )
   }
}
