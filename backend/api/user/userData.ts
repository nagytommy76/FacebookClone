import { Router } from 'express'
import { ValidateAddWorkplace } from './validators/userDataValidator'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { authenticateUserCredentials } from '../../middlewares/authenticateUser'
import {
   getUserDetailsWithOwnPosts,
   saveUserProfilePicture,
   getCurrentProfilePictures,
   editSelectedProfilePicture,
   getCurrentSelectedProfileImage,
} from '../../controllers/users/userDetails/userDetails'
import {
   getNotifications,
   setActiveNotifications,
   removeUsersNotification,
} from '../../controllers/notifications/notifications'

import { addNewWorkplaceController } from '../../controllers/users/userDetails/userProfile'

const router = Router()

router.get('/notifications', authenticateAccessTokenForApi, getNotifications)
router.patch('/set-active', authenticateAccessTokenForApi, setActiveNotifications)
router.delete('/notification', authenticateAccessTokenForApi, removeUsersNotification)

router.get('/get-details', authenticateAccessTokenForApi, getUserDetailsWithOwnPosts)
router.get('/get-profile-pictures', authenticateAccessTokenForApi, getCurrentProfilePictures)
router.get('/get-current-picture', authenticateAccessTokenForApi, getCurrentSelectedProfileImage)

router.post('/save-profile-picture', authenticateAccessTokenForApi, saveUserProfilePicture)
router.put('/edit-profile-picture', authenticateAccessTokenForApi, editSelectedProfilePicture)

// Profile Work/studies etc..
router.post(
   '/save-workplace',
   ValidateAddWorkplace,
   authenticateAccessTokenForApi,
   authenticateUserCredentials,
   addNewWorkplaceController
)

module.exports = router
