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

export const updateCommentController = async (request: IRemoveCommentRequest, response: Response) => {
   const { commentId, modifiedText, postId } = request.body

   try {
      const foundPostComment = await PostModel.findOne({
         _id: postId,
         comments: { $elemMatch: { _id: commentId } },
      }).select('comments.$')
      if (!foundPostComment) return response.status(404)
      foundPostComment.comments[0].comment = modifiedText

      foundPostComment.save()

      response.status(201).json({ modifiedComment: foundPostComment.comments[0].comment })
   } catch (error) {
      response.status(500).json({ msg: 'internal server error', error })
   }
}
