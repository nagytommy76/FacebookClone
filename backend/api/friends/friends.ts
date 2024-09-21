import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'

import { getUsers, getAcceptedUsers } from '../../controllers/friends/getFriends'
import { makeFriendshipController } from '../../controllers/friends/friends'
import { confirmFriendshipController } from '../../controllers/friends/confirmFriend'
import { removeFriendController } from '../../controllers/friends/removeFriend'
import type SocketService from 'config/socketIo.config'

export default class FriendsApi {
   public router
   private io: SocketService

   constructor(io: SocketService) {
      this.io = io
      this.router = Router()
      this.configureRoutes()
   }

   public configureRoutes() {
      this.router.get('/get-friends', getUsers)

      this.router.get('/get-accepted-friends', authenticateAccessTokenForApi, (request, response) =>
         getAcceptedUsers(request, response, this.io)
      )

      this.router.post('/make-friendship', authenticateAccessTokenForApi, makeFriendshipController)
      this.router.post('/confirm-friendship', authenticateAccessTokenForApi, confirmFriendshipController)
      this.router.delete('/remove-friend', authenticateAccessTokenForApi, removeFriendController)
   }
}
