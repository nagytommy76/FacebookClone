import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getUserDetailsWithOwnPosts = async (request: IJWTUserType, response: Response) => {
   const userId = request.user?.userId
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUserWithPosts = await UserModel.findById(userId).populate({
         path: 'posts',
         populate: { path: 'userId' },
      })
      return response.status(200).json(foundUserWithPosts)
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
