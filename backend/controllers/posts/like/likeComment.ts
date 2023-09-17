import { Response } from 'express'
import BasePostController from '../Base/basePost'
import { ICommentLikeRequest, ICommentAnswerLikeRequest } from '../types/PostTypes'

export default class CommentLikeController extends BasePostController {
   likeCommentController = async (request: ICommentLikeRequest, response: Response) => {
      const { commentId, postId, reactionType } = request.body
      const userId = request.user?.userId as string | any
      try {
         // https://www.mongodb.com/community/forums/t/how-to-only-get-the-array-nested-subdocuments-with-that-document-id-and-not-having-to-iterate-through-it/100197
         const foundPostToModifyLike = await this.findPostModelByPostId(postId)
         if (!foundPostToModifyLike) return response.status(404).json({ msg: 'Post comment not found' })

         const commentLikeIndex = foundPostToModifyLike.comments.findIndex((comment) => {
            return comment._id?.toString() === commentId.toString()
         })
         const userLike = this.findUsersLikeByUserID(
            foundPostToModifyLike.comments[commentLikeIndex].likes,
            userId
         )
         this.checkUserLike(
            userLike,
            reactionType,
            foundPostToModifyLike.comments[commentLikeIndex].likes,
            userId
         )

         await foundPostToModifyLike.save()
         await foundPostToModifyLike.populate({
            path: 'comments.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         response.status(200).json(foundPostToModifyLike.comments[commentLikeIndex].likes)
      } catch (error) {
         console.log(error)
         response.status(500).json({ error })
      }
   }

   likeCommentAnswerController = async (request: ICommentAnswerLikeRequest, response: Response) => {
      const { commentId, postId, commentAnswerId, reactionType } = request.body
      const userId = request.user?.userId

      const foundPostToModifyLike = await this.findPostModelByPostId(postId)
      if (!foundPostToModifyLike) return response.status(404).json({ msg: 'Post comment not found' })
   }
}
