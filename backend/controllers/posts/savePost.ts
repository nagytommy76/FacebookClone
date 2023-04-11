import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

import { IPostRequest } from './PostTypes'

/**
 * a userId az accessToken decoded fog jönni
 */
export const savePostController = async (req: IPostRequest, res: Response) => {
   const { description, postedPicturesPath } = req.body

   try {
      const createdPost = await PostModel.create({
         userId: req.user?.userId,
         description,
         postedPicturesPath,
      })

      res.status(201).json({ createdPost })
   } catch (error) {
      res.status(500).json(error)
   }
}
