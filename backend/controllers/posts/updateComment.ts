import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

interface IRemoveCommentRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      modifiedText: string
   }
}

interface IRemoveCommentAnswerRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      modifiedText: string
      commentAnswerId: string
   }
}

export const updateCommentController = async (request: IRemoveCommentRequest, response: Response) => {
   const { commentId, modifiedText, postId } = request.body

   try {
      const foundPostComment = await PostModel.updateOne(
         {
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         },
         { $set: { 'comments.$.comment': modifiedText } }
      )

      response.status(201).json({ modifiedComment: modifiedText, foundPostComment })
   } catch (error) {
      response.status(500).json({ msg: 'internal server error', error })
   }
}

export const updateCommentAnswerController = async (
   request: IRemoveCommentAnswerRequest,
   response: Response
) => {
   const { commentAnswerId, commentId, modifiedText, postId } = request.body
   try {
      const found = await PostModel.updateOne(
         //const found = await PostModel.findOne(
         {
            _id: postId,
            comments: { $elemMatch: { _id: commentId, 'commentAnswers._id': commentAnswerId } },
            // 'comments.commentAnswers': { $elemMatch: { _id: commentAnswerId } },
         },
         {
            $set: {
               // 'commentAnswers.$.comment': modifiedText,
               'comment.$[outer].commentAnswers.$[inner].comment': modifiedText,
            },
         },
         {
            arrayFilters: [{ 'outer._id': commentId }, { 'inner._id': commentAnswerId }],
         }
      )
      response.status(201).json(found)
   } catch (error) {
      response.status(500).json({ msg: 'internal server error', error })
   }
}
