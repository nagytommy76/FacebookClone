import { Response, Request } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import BasePostController from './Base/basePost'

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

   getUsersAllPosts = async (req: IJWTUserType, res: Response) => {
      const userId = req.user?.userId
      if (!userId) return res.status(404).json({ msg: 'User not found' })
      try {
         const allUsersPosts = await this.returnPostModelWithPopulated(userId)
         res.status(200).json(allUsersPosts)
      } catch (error) {
         res.status(500).json(error)
      }
   }
}
