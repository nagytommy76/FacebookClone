import { Posts as PostModel } from '../../models/posts/posts'
import type { Response, Request } from 'express'

interface IRemoveCommentRequest extends Request {
   body: {
      postId: string
      commentId: string
      modifiedText: string
      commentImage: string | null
   }
}

interface IRemoveCommentAnswerRequest extends Request {
   body: {
      postId: string
      commentId: string
      modifiedText: string
      commentAnswerId: string
      commentImage: string | null
   }
}

export const updateCommentController = async (request: IRemoveCommentRequest, response: Response) => {
   const { commentId, modifiedText, postId, commentImage } = request.body

   try {
      // return response.status(500).json({ modifiedComment: modifiedText, uploadedImageLink: commentImage })
      const foundPostComment = await PostModel.updateOne(
         {
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         },
         {
            $set: {
               'comments.$.comment': modifiedText,
               'comments.$.commentImage': commentImage,
            },
         }
      )
      response
         .status(201)
         .json({ modifiedComment: modifiedText, uploadedImageLink: commentImage, foundPostComment })
   } catch (error) {
      console.log(error)
      response.status(500).json({ msg: 'internal server error', error })
   }
}

export const updateCommentAnswerController = async (
   request: IRemoveCommentAnswerRequest,
   response: Response
) => {
   const { commentAnswerId, commentId, commentImage, modifiedText, postId } = request.body
   try {
      const found = await PostModel.updateOne(
         {
            _id: postId,
            comments: { $elemMatch: { _id: commentId, 'commentAnswers._id': commentAnswerId } },
         },
         {
            $set: {
               'comments.$[outer].commentAnswers.$[inner].comment': modifiedText,
               'comments.$[outer].commentAnswers.$[inner].commentImage': commentImage,
            },
         },
         {
            arrayFilters: [{ 'outer._id': commentId }, { 'inner._id': commentAnswerId }],
            upsert: true,
         }
      )
      response.status(201).json({ modifiedComment: modifiedText, uploadedImageLink: commentImage })
   } catch (error) {
      response.status(500).json({ msg: 'internal server error', error })
   }
}

/**
 *    https://dev.to/rajeshroyal/update-an-object-in-nested-array-in-mongodb-o5a
 *    https://www.mongodb.com/docs/v6.2/reference/method/db.collection.updateOne/#examples
 *
 */
