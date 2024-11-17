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

export default class UserApi {
   public router
   constructor() {
      this.router = Router()
      this.configureRoutes()
   }
   configureRoutes() {
      this.router.post('/register', ValidateRegister, authValidationMiddleware, registerUserController)
      this.router.post('/login', ValidateLogin, authValidationMiddleware, loginUserController)
      this.router.post('/logout', logoutUserController)

      this.router.post('/refresh-token', checkRefreshTokenValidityController)
      this.router.post('/generate-access-token', checkAccessTokenValidityController)
   }
}
