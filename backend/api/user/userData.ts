import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import {
   getUserDetailsWithOwnPosts,
   saveUserProfilePicture,
   getCurrentProfilePictures,
} from '../../controllers/users/userDetails'

const router = Router()

router.get('/get-details', authenticateAccessTokenForApi, getUserDetailsWithOwnPosts)
router.get('/get-profile-pictures', authenticateAccessTokenForApi, getCurrentProfilePictures)

router.post('/save-profile-picture', authenticateAccessTokenForApi, saveUserProfilePicture)

module.exports = router
