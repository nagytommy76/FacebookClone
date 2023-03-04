import { Router } from 'express'
import { ValidateRegister, ValidateLogin } from './validators/authValidator'
import { authValidationMiddleware } from '../../middlewares/authValidationMiddleware'

import { loginUserController } from '../../controllers/users/users'
import { registerUserController } from '../../controllers/users/register'

const router = Router()

router.post('/register', ValidateRegister, authValidationMiddleware, registerUserController)
router.post('/login', ValidateLogin, authValidationMiddleware, loginUserController)

module.exports = router
