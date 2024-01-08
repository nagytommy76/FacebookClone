import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { getUsers, makeFriendshipController } from '../../controllers/friends/friends'

const router = Router()

router.get('/get-friends', getUsers)

router.post('/make-friendship', makeFriendshipController, authenticateAccessTokenForApi)

module.exports = router
