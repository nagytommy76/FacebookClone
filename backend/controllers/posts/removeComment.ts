import { Types } from 'mongoose'
import { Posts as PostModel } from '../../models/posts/posts'
// import { ICommentAnswer } from './types/commentTypes'
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
      commentId: string
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
   const { answerId, commentId, postId } = request.body

   try {
      const updateResult = await PostModel.updateOne(
         {
            _id: postId,
            'comments.commentAnswer._id': new Types.ObjectId(answerId),
         },
         {
            $set: {
               'comments.$[outer].commentAnswers.$[inner].isDeleted': true,
            },
         },
         {
            arrayFilters: [{ 'outer._id': commentId }, { 'inner._id': answerId }],
            new: true,
         }
      )

      response.status(200).json({
         status: 200,
         msg: 'success',
      })
   } catch (error) {
      console.log(error)
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
