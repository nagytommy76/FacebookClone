import { Types } from 'mongoose'
import { Posts as PostModel } from '../../models/posts/posts'
import { ICommentAnswer } from './types/commentTypes'
import type { Response, Request } from 'express'

interface IRemoveCommentRequest extends Request {
   body: {
      postId: string
      commentId: string
   }
}
interface IRemoveAnswerRequest extends Request {
   body: {
      postId: string
      answerId: string
   }
}

export const removeCommentController = async (request: IRemoveCommentRequest, response: Response) => {
   const { postId, commentId } = request.body
   const currentUserId = request.user?.userId
   try {
      // ha egy "fő" komment:
      const foundPostsComment = await PostModel.find({
         _id: postId,
         comments: { $elemMatch: { _id: commentId, userId: currentUserId } },
      }).select('comments')

      foundPostsComment[0].comments = foundPostsComment[0].comments.filter(
         (comment) => comment._id?.toString() != commentId.toString()
      )
      foundPostsComment[0].save()
      response.status(200).json({ msg: 'success', commentsLength: foundPostsComment[0].comments.length })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}

export const removeCommentAnswerController = async (request: IRemoveAnswerRequest, response: Response) => {
   const { postId, answerId } = request.body

   try {
      const foundPostsComment = await PostModel.findOne({
         _id: postId,
         // Hard coded comment._id
         comments: { $elemMatch: { _id: '6506f9520b58c0c9c786a575' } },
         'comments.commentAnswers': { $elemMatch: { _id: answerId } },
      }).select(['comments.commentAnswers.$'])

      // const matchedAnswer = await PostModel.aggregate([
      //    { $match: { _id: new Types.ObjectId(postId) } },
      //    { $unwind: '$comments' },
      //    { $unwind: '$comments.commentAnswers' },
      //    { $match: { 'comments.commentAnswers._id': new Types.ObjectId(answerId) } },
      //    { $project: { answer: '$comments.commentAnswers' } },
      // ])

      if (foundPostsComment == null) return response.status(404).json({ msg: 'foundPostsComment not found' })

      foundPostsComment.comments[0].commentAnswers = foundPostsComment.comments[0].commentAnswers.map(
         (answer) => {
            if (answer._id == answerId) {
               return {
                  ...answer,
                  isDeleted: true,
               }
            }
            return answer
         }
      )

      response.status(200).json({
         msg: 'helló VÁLASZ TÖRLÉS',
         foundAnswerToDelete: foundPostsComment.comments[0].commentAnswers,
         foundPostsComment,
         // matchedAnswer,
      })
   } catch (error) {
      console.log(error)
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
