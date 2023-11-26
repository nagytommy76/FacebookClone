import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

interface IRemoveCommentRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      modifiedText: string
      commentImage: string | null
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
   const { commentId, modifiedText, postId, commentImage } = request.body

   try {
      const foundPostComment = await PostModel.updateOne(
         {
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         },
         [
            { $set: { 'comments.$[outer].comment': modifiedText } },
            { $set: { 'comments.$[outer].commentImage': commentImage } },
         ],
         {
            arrayFilters: [{ 'outer._id': commentId }],
            upsert: true,
         }
      )

      response.status(201).json({ modifiedComment: modifiedText, foundPostComment })
   } catch (error) {
      console.log(error)
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
         {
            _id: postId,
            comments: { $elemMatch: { _id: commentId, 'commentAnswers._id': commentAnswerId } },
         },
         {
            $set: {
               'comments.$[outer].commentAnswers.$[inner].comment': modifiedText,
            },
         },
         {
            arrayFilters: [{ 'outer._id': commentId }, { 'inner._id': commentAnswerId }],
            upsert: true,
         }
      )
      response.status(201).json(found)
   } catch (error) {
      response.status(500).json({ msg: 'internal server error', error })
   }
}

/**
 *    https://dev.to/rajeshroyal/update-an-object-in-nested-array-in-mongodb-o5a
 *    https://www.mongodb.com/docs/v6.2/reference/method/db.collection.updateOne/#examples
 *
 */
