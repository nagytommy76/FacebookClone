import { Response, Request } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

import type { IJWTUserType as IJWTUserTypeRequest } from '../../middlewares/accessTokenRefresh'

export const getAllPosts = async (req: Request, res: Response) => {
   try {
      const allPosts = await PostModel.find({})
         .populate({
            path: 'userId',
            select: ['email', '_id', 'sureName', 'firstName', 'userDetails'],
         })
         .populate({
            path: 'comments.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
            // match: { 'userDetails.profilePicturePath.isSelected': true },
         })
         .lean()
      res.status(200).json({ allPosts })
   } catch (error) {
      res.status(500).json({ error, msg: 'internal server error' })
   }
}

export const getOwnPostsController = async (req: IJWTUserTypeRequest, res: Response) => {
   const userId = req.user?.userId

   try {
      const allPosts = await PostModel.find({ userId })
         .populate({
            path: 'userId',
         })
         .populate({
            path: 'comments.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath'],
         })
         .lean()
      res.status(200).json(allPosts)
   } catch (error) {
      res.status(500).json(error)
   }
}
