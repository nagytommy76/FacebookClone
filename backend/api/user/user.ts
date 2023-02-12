import { Router } from 'express'
import { ValidateRegister, ValidateLogin } from './validators/registerValidator'
import { authValidationMiddleware } from '../../middlewares/authValidationMiddleware'

import { registerUserController, loginUserController } from '../../controllers/users/users'

const router = Router()

router.post('/register', ValidateRegister, authValidationMiddleware, registerUserController)
router.post('/login', ValidateLogin, authValidationMiddleware, loginUserController)

module.exports = router
