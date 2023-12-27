import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import {
   getUserDetailsWithOwnPosts,
   saveUserProfilePicture,
   getCurrentProfilePictures,
   editSelectedProfilePicture,
   getCurrentSelectedProfileImage,
} from '../../controllers/users/userDetails'
import { getNotifications } from '../../controllers/users/notifications'

const router = Router()

router.get('/notifications', authenticateAccessTokenForApi, getNotifications)

router.get('/get-details', authenticateAccessTokenForApi, getUserDetailsWithOwnPosts)
router.get('/get-profile-pictures', authenticateAccessTokenForApi, getCurrentProfilePictures)
router.get('/get-current-picture', authenticateAccessTokenForApi, getCurrentSelectedProfileImage)

router.post('/save-profile-picture', authenticateAccessTokenForApi, saveUserProfilePicture)
router.put('/edit-profile-picture', authenticateAccessTokenForApi, editSelectedProfilePicture)

module.exports = router
