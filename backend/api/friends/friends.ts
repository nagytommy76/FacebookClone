import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'

import { getUsers, getAcceptedUsers } from '../../controllers/friends/getFriends'
import { makeFriendshipController } from '../../controllers/friends/friends'
import { confirmFriendshipController } from '../../controllers/friends/confirmFriend'
import { removeFriendController } from '../../controllers/friends/removeFriend'

const router = Router()

router.get('/get-friends', getUsers)
router.get('/get-accepted-friends', authenticateAccessTokenForApi, getAcceptedUsers)

router.post('/make-friendship', authenticateAccessTokenForApi, makeFriendshipController)
router.post('/confirm-friendship', authenticateAccessTokenForApi, confirmFriendshipController)
router.delete('/remove-friend', authenticateAccessTokenForApi, removeFriendController)

module.exports = router
