import { Response } from 'express'
import BasePostController from '../Base/basePost'
import { Posts as PostModel } from '../../../models/posts/posts'
import type { ICommentLikeRequest, ICommentAnswerLikeRequest, IPostLike } from '../types/PostTypes'
import type { ICommentAnswer } from '../types/commentTypes'

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
      const userId = request.user?.userId as string

      try {
         const postToModifyLike = await PostModel.findOne({
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         }).select(['comments.$'])
         if (!postToModifyLike) return response.status(404).json({ msg: 'Post comment not found' })

         const commentAnswersLikeIndex = postToModifyLike.comments[0].commentAnswers.findIndex(
            (commentAnswer) => {
               return commentAnswer._id?.toString() === commentAnswerId.toString()
            }
         )

         const userLike = this.findUsersLikeByUserID(
            postToModifyLike.comments[0].commentAnswers[commentAnswersLikeIndex].likes,
            userId
         )
         this.checkUserLike(
            userLike,
            reactionType,
            postToModifyLike.comments[0].commentAnswers[commentAnswersLikeIndex].likes,
            userId
         )
         await postToModifyLike.save()
         response.status(200).json({ postToModifyLike })
      } catch (error) {
         console.log(error)
         response.status(500).json({ msg: 'internal server error', error })
      }
   }
}

// const PostToModifyLike = await PostModel.updateOne(
//    {
//       _id: postId,
//       comments: {
//          $elemMatch: { _id: commentId, 'commentAnswers._id': commentAnswerId },
//       },
//    },
//    {
//       $push: {
//          'comments.$[outer].commentAnswers.$[inner].likes': {
//             userId,
//             reactionType: {
//                isLike: false,
//                isAngry: false,
//                isCare: false,
//                isHaha: false,
//                isLove: false,
//                isSad: false,
//                isWow: false,
//                [reactionType]: true,
//             },
//          },
//       },
//    },
//    {
//       arrayFilters: [{ 'outer._id': commentId }, { 'inner._id': commentAnswerId }],
//    }
// )

// https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#examples

// Ezt így kell megcsinálnom
