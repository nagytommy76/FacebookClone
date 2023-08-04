import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

interface IRemoveRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      isChildComment: boolean
   }
}

export const removeCommentController = async (request: IRemoveRequest, response: Response) => {
   const user = request.user
   const { postId, commentId, isChildComment } = request.body

   try {
      // ha ez egy komment :
      const foundPostsComment = await PostModel.find({
         _id: postId,
         comments: { $elemMatch: { _id: commentId } },
         // 'comments.commentAnswers': { $elemMatch: { _id: commentId } },
      }).select('comments')

      response.status(200).json({ msg: 'helló' })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
