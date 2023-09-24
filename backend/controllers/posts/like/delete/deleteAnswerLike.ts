import { Response } from 'express'
import BaseLikeController from '../../Base/baseLike'
import { Posts as PostModel } from '../../../../models/posts/posts'
import type { IAnswerRemoveLikeRequest } from '../../types/PostTypes'

export default class DeleteAnswerLike extends BaseLikeController {
   deleteLikeAnswerController = async (request: IAnswerRemoveLikeRequest, response: Response) => {
      const { answerId, commentId, postId, likeIdToDelete } = request.body
      const userId = request.user?.userId as string
      try {
         const found = await PostModel.updateOne(
            {
               _id: postId,
               comments: {
                  $elemMatch: {
                     _id: commentId,
                     'commentAnswers._id': answerId,
                     'commentAnswers.likes._id': likeIdToDelete,
                  },
               },
            },
            {
               $pull: {
                  'comments.$[outer].commentAnswers.$[inner].likes': { _id: likeIdToDelete, userId },
               },
            },
            {
               arrayFilters: [{ 'outer._id': commentId }, { 'inner._id': answerId }],
               upsert: true,
            }
         )

         response.status(200).json({ msg: 'Törlés', found })
      } catch (error) {
         console.log(error)
         response.status(500).json({ error })
      }
   }
}
