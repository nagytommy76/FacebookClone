import { Router } from 'express'
import { ValidateRegister, ValidateLogin } from './validators/authValidator'
import { authValidationMiddleware } from '../../middlewares/authValidationMiddleware'

import {
   checkRefreshTokenValidityController,
   checkAccessTokenValidityController,
   logoutUserController,
} from '../../controllers/users/users'
import { loginUserController } from '../../controllers/users/login'
import { registerUserController } from '../../controllers/users/register'

const router = Router()

router.post('/register', ValidateRegister, authValidationMiddleware, registerUserController)
router.post('/login', ValidateLogin, authValidationMiddleware, loginUserController)
router.post('/logout', logoutUserController)

router.post('/refresh-token', checkRefreshTokenValidityController)
router.post('/generate-access-token', checkAccessTokenValidityController)

module.exports = router
