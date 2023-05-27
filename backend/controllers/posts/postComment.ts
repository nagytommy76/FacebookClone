import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import type { ICommentLikeRequest } from './PostTypes'

export const savePostComment = async (request: ISavePostRequest, response: Response) => {
   const userId = request.user?.userId
   const { comment, postId } = request.body
   if (!userId) return response.status(404).json({ msg: 'User not found' })
   try {
      const foundPost = await PostModel.findById(postId)
      foundPost?.comments.push({
         comment,
         userId,
         parentCommentId: null,
         commentDepth: 1,
         likes: [],
      })
      await foundPost?.save()
      response.status(200).json({ comments: foundPost?.comments })
   } catch (error) {
      response.status(500).json({ error })
   }
}

export const likeCommentController = async (request: ICommentLikeRequest, response: Response) => {
   const { commentId, postId, reactionType } = request.body
   const userId = request.user?.userId

   try {
      // https://www.mongodb.com/community/forums/t/how-to-only-get-the-array-nested-subdocuments-with-that-document-id-and-not-having-to-iterate-through-it/100197
      const foundPostToModifyLike = await PostModel.find(
         {
            _id: postId,
         },
         {
            comments: {
               $elemMatch: { _id: commentId },
            },
         }
      )
      response.status(200).json(foundPostToModifyLike)
   } catch (error) {
      response.status(500).json(error)
   }
}

interface ISavePostRequest extends IJWTUserType {
   body: {
      postId: string
      comment: string
   }
}
