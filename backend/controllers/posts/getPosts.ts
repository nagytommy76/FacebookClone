import { Response, Request } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

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
         })
         .lean()
      res.status(200).json({ allPosts })
   } catch (error) {
      res.status(500).json({ error, msg: 'internal server error' })
   }
}

export const getCommentLikes = async (req: Request, res: Response) => {
   const test = await PostModel.aggregate([
      {
         $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
            pipeline: [{ $project: { email: 1, _id: 1, sureName: 1, firstName: 1, userDetails: 1 } }],
         },
      },
      {
         $lookup: {
            from: 'posts',
            localField: 'comments.userId',
            foreignField: '_id',
            as: 'userId',
         },
      },
   ])

   res.status(200).json(test)
}
