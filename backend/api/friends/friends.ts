import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { makeFriendshipController } from '../../controllers/friends/friends'
import { getUsers } from '../../controllers/friends/getFriends'
import { confirmFriendshipController } from '../../controllers/friends/confirmFriend'

const router = Router()

router.get('/get-friends', getUsers)

router.post('/make-friendship', authenticateAccessTokenForApi, makeFriendshipController)
router.post('/confirm-friendship', authenticateAccessTokenForApi, confirmFriendshipController)

module.exports = router
