import { Response, response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

import { IPostRequest, IPostImageRequest } from './types/PostTypes'

/**
 * a userId az accessToken decoded fog jönni
 */
export const savePostController = async (req: IPostRequest, res: Response) => {
   const { description, createdAt } = req.body
   const userId = req.user?.userId
   if (!userId) return response.status(404).json({ msg: 'User not found' })
   try {
      const createdPost = await PostModel.create({
         userId: userId,
         createdAt,
         description,
      })
      await createdPost.populate({
         path: 'userId',
         select: ['email', '_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })
      res.status(201).json({ createdPost })
   } catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
}

export const savePostImageController = async (req: IPostImageRequest, res: Response) => {
   const { postId, postedPicturesPath } = req.body
   const userId = req.user?.userId
   if (!userId) return response.status(404).json({ msg: 'User not found' })
   try {
      await PostModel.updateOne({ _id: postId, userId }, [{ $set: { postedPicturesPath } }])
      res.status(201).json({ msg: 'success' })
   } catch (error) {
      res.status(500).json({ error })
   }
}
