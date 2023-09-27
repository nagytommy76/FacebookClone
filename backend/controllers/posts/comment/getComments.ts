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
      const foundComments = await PostModel.find({ _id: postId }).select('comments')

      res.status(200).json({ foundComments })
   }
}
