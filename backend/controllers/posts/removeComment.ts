import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

interface IRemoveCommentRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
   }
}
interface IRemoveAnswerRequest extends IJWTUserType {
   body: {
      postId: string
      answerId: string
   }
}

export const removeCommentController = async (request: IRemoveCommentRequest, response: Response) => {
   const user = request.user
   const { postId, commentId } = request.body

   try {
      // ha egy "fő" komment:
      const foundPostsComment = await PostModel.find({
         _id: postId,
         comments: { $elemMatch: { _id: commentId } },
      })
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

      foundPostsComment[0].comments = foundPostsComment[0].comments.filter(
         (comment) => comment._id?.toString() != commentId.toString()
      )

      response.status(200).json({ msg: 'helló', newComments: foundPostsComment[0].comments })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}

export const removeCommentAnswerController = async (request: IRemoveAnswerRequest, response: Response) => {
   const { postId, answerId } = request.body

   try {
      const foundPostsComment = await PostModel.find({
         _id: postId,
         'comments.commentAnswers': { $elemMatch: { _id: answerId } },
      }).select([/*'comments.$',*/ 'comments.commentAnswers.$'])
      foundPostsComment[0].comments[0].commentAnswers =
         foundPostsComment[0].comments[0].commentAnswers?.filter((answer) => answer._id != answerId)
      // Itt meg kell oldani,hogy a child answerek is törlődjenek!
      response.status(200).json({ msg: 'helló VÁLASZ TÖRLÉS', semmi: foundPostsComment[0] })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
