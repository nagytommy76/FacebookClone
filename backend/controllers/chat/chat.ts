import { Types } from 'mongoose'
import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const saveChatController = (request: IJWTUserType, response: Response) => {
   const userId = request.user?.userId
   try {
      response.status(200).json({ msg: 'minden ok' })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
