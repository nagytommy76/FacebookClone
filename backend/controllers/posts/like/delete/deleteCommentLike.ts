import { Response } from 'express'
import BaseLikeController from '../../../Base/BaseLikeController'
import { ICommentRemoveLikeRequest } from '../../types/PostTypes'
import { Posts as PostModel } from '../../../../models/posts/posts'

export default class DeleteCommentLike extends BaseLikeController {
   deleteLikeCommentController = async (request: ICommentRemoveLikeRequest, response: Response) => {
      const { commentId, postId, likeIdToDelete } = request.body
      const userId = request.user?.userId
      try {
         const found = await PostModel.updateOne(
            {
               _id: postId,
               comments: {
                  $elemMatch: { _id: commentId, 'likes._id': likeIdToDelete, 'likes.userId': userId },
               },
            },
            {
               $pull: {
                  'comments.$[outer].likes': { _id: likeIdToDelete, userId },
               },
            },
            {
               arrayFilters: [{ 'outer._id': commentId }],
               upsert: true,
            }
         )

         response.status(200).json({ found })
      } catch (error) {
         response.status(500).json(error)
      }
   }
}
