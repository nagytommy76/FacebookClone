import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import BasePostController from './Base/basePost'

interface IGetUsersPosts extends IJWTUserType {
   query: {
      userId: string | undefined
   }
}

export default class GetPostsController extends BasePostController {
   getAllPosts = async (req: Request, res: Response) => {
      try {
         const allPosts = await this.returnPostModelWithPopulated()
         res.status(200).json({ allPosts })
      } catch (error) {
         console.log(error)
         res.status(500).json({ error, msg: 'internal server error' })
      }
   }

   // Ebben az esetben nem a token-ből jön a userId hanem a query (params) ból
   getUsersAllPosts = async (req: IGetUsersPosts, res: Response) => {
      const userId = req.query.userId
      if (!userId) return res.status(404).json({ msg: 'User not found' })
      try {
         const allUsersPosts = await this.returnPostModelWithPopulated(userId)
         res.status(200).json({ allPosts: allUsersPosts })
      } catch (error) {
         res.status(500).json(error)
      }
   }
}
