import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

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

interface ISavePostRequest extends IJWTUserType {
   body: {
      postId: string
      comment: string
   }
}
