import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { getUserDetailsWithOwnPosts, saveUserProfilePicture } from '../../controllers/users/userDetails'

const router = Router()

router.get('/get-details', authenticateAccessTokenForApi, getUserDetailsWithOwnPosts)
router.post('/save-profile-picture', authenticateAccessTokenForApi, saveUserProfilePicture)

module.exports = router
