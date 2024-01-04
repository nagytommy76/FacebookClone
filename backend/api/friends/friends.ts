import { Router } from 'express'
import { authenticateAccessTokenForApi } from '../../middlewares/accessTokenRefresh'
import { getUsers } from '../../controllers/friends/friends'

const router = Router()

router.get('/get-friends', getUsers)

module.exports = router
