import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../../middlewares/accessTokenRefresh'
import {
   updateCommentAnswerController,
   updateCommentController,
} from '../../../controllers/posts/updateComment'
import { updatePostController } from '../../../controllers/posts/updatePost'

const router = Router()

// POSZT
router.put('/update-post', authenticateAccessTokenForApi, updatePostController)

// Módosítás - KOMMENT
router.put('/update-post-comment', authenticateAccessTokenForApi, updateCommentController)
router.put('/update-post-comment-answer', authenticateAccessTokenForApi, updateCommentAnswerController)

module.exports = router
