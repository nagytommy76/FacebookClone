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

import {
   addNewWorkplaceController,
   removeSingleWorkplace,
} from '../../controllers/users/userDetails/userProfile'

export default class UserDataApi {
   public router
   constructor() {
      this.router = Router()
      this.configureRoutes()
   }

   public configureRoutes() {
      this.router.get('/notifications', authenticateAccessTokenForApi, getNotifications)
      this.router.patch('/set-active', authenticateAccessTokenForApi, setActiveNotifications)
      this.router.delete('/notification', authenticateAccessTokenForApi, removeUsersNotification)

      this.router.get('/get-details', authenticateAccessTokenForApi, getUserDetailsWithOwnPosts)
      this.router.get('/get-profile-pictures', authenticateAccessTokenForApi, getCurrentProfilePictures)
      this.router.get('/get-current-picture', authenticateAccessTokenForApi, getCurrentSelectedProfileImage)

      this.router.post('/save-profile-picture', authenticateAccessTokenForApi, saveUserProfilePicture)
      this.router.put('/edit-profile-picture', authenticateAccessTokenForApi, editSelectedProfilePicture)

      // Profile Work/studies etc..
      this.router.post(
         '/save-workplace',
         ValidateAddWorkplace,
         authenticateAccessTokenForApi,
         authenticateUserCredentials,
         addNewWorkplaceController
      )

      this.router.put(
         '/remove-work',
         authenticateAccessTokenForApi,
         authenticateUserCredentials,
         removeSingleWorkplace
      )
   }
}
