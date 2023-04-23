import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import type { IPostLikeRequest } from './PostTypes'

export const likePostController = async (request: IPostLikeRequest, response: Response) => {
   const { postId, reactionType } = request.body
   const userId = request.user?.userId as any
   //    if(!userId) return response.status(404)
   try {
      const foundPostToModifyLike = await PostModel.findById(postId)
      if (!foundPostToModifyLike) return response.status(404).json({ msg: 'nincs ilyen poszt' })
      foundPostToModifyLike.likes.push({ reactionType, userId })

      response
         .status(200)
         .json({ msg: foundPostToModifyLike, ember: request.user, mit: request.body.reactionType })
   } catch (error) {
      response.status(500)
   }
}
