import { Response, Request } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

import type { IJWTUserType as IJWTUserTypeRequest } from '../../middlewares/accessTokenRefresh'

export const getOwnPostsController = async (req: IJWTUserTypeRequest, res: Response) => {
   const userId = req.user?.userId

   try {
      const allPosts = await PostModel.find({ userId })
      res.status(200).json(allPosts)
   } catch (error) {
      res.status(500).json(error)
   }
}
