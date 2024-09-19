import { Posts as PostModel } from '../../../models/posts/posts'
import type { Response, Request } from 'express'

interface ICommentRequest extends Request {
   query: {
      postId: string
   }
}

export default class GetCommentController {
   getCommentsController = async (req: ICommentRequest, res: Response) => {
      const postId = req.query.postId
      try {
         const foundComments = await PostModel.findOne({ _id: postId })
            .selectAndPopulateUserPicure('comments', 'comments.userId')
            .selectAndPopulateUserPicure('comments', 'comments.commentAnswers.userId')
            .lean()
         res.status(200).json({ comments: foundComments.comments })
      } catch (error) {
         res.status(500).json(error)
      }
   }
}
