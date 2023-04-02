import { Router } from 'express'
import { savePostController } from '../../controllers/posts/savePost'

const router = Router()
// Ide kell egy api route protection (accessTokennel, middleware)
router.post('/save-post', savePostController)

module.exports = router
