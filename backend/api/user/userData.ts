import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { getUserDetailsWithOwnPosts } from '../../controllers/users/userDetails'

const router = Router()

router.get('/get-details', authenticateAccessTokenForApi, getUserDetailsWithOwnPosts)

module.exports = router
