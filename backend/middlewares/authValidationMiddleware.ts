import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'
import { IRegisterRequest, ILoginRequest } from '../controllers/users/Types'

export const authValidationMiddleware = (
   req: IRegisterRequest | ILoginRequest,
   res: Response,
   next: NextFunction
) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
   }
   next()
}
