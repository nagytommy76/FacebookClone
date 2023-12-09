import { Response, Request } from 'express'
import { Posts as PostModel } from '../../../models/posts/posts'
import type { IJWTUserType } from '../../../middlewares/accessTokenRefresh'

interface ICommentRequest extends IJWTUserType {
   query: {
      postId: string
   }
}

export default class GetCommentController {
   getCommentsController = async (req: ICommentRequest, res: Response) => {
      const postId = req.query.postId
      try {
         const foundComments = await PostModel.find({ _id: postId })
            .select('comments')
            .populate({
               path: 'comments.userId',
               select: ['_id', 'firstName', 'sureName', 'userDetails.profilePicturePath.$'],
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })
            .populate({
               path: 'comments.commentAnswers.userId',
               select: ['_id', 'firstName', 'sureName', 'userDetails.profilePicturePath.$'],
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })
            .populate({
               path: 'comments.commentAnswers.childAnswers.userId',
               select: ['_id', 'firstName', 'sureName', 'userDetails.profilePicturePath.$'],
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })
            .lean()

         res.status(200).json({ comments: foundComments[0].comments })
      } catch (error) {
         res.status(500).json(error)
      }
   }
}
