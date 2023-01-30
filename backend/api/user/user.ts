import { Router } from 'express'
import { ValidateRegister } from './validators/registerValidator'

import { registerUserController } from '../../controllers/users/users'

const router = Router()

router.post('/register', ValidateRegister, registerUserController)

module.exports = router
