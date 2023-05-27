import { Response, response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import { User as UserModel } from '../../models/user/user'

import { IPostRequest } from './PostTypes'

/**
 * a userId az accessToken decoded fog jönni
 */
export const savePostController = async (req: IPostRequest, res: Response) => {
   const { description, postedPicturesPath } = req.body
   const userId = req.user?.userId
   if (!userId) return response.status(404).json({ msg: 'User not found' })
   try {
      const postingUser = await UserModel.findById(userId)
      const createdPost = await PostModel.create({
         userId: userId,
         createdAt: new Date(),
         description,
         postedPicturesPath,
      })

      postingUser?.posts.push(createdPost._id)
      await postingUser?.save()
      res.status(201).json({ createdPost })
   } catch (error) {
      res.status(500).json(error)
   }
}
