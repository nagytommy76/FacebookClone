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
      const foundComments = await PostModel.find({ _id: postId })
         .select('comments')
         .populate({
            path: 'comments.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         .populate({
            path: 'comments.commentAnswers.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         .lean()

      res.status(200).json({ comments: foundComments[0].comments })
   }
}
