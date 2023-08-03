import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const removeCommentController = (request: IJWTUserType, response: Response) => {
   const user = request.user
   const { postId, commentId } = request.body

   try {
      response.status(200).json({ msg: 'helló' })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
