import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import type { IPostLikeRequest } from './PostTypes'

export const likePostController = async (request: IPostLikeRequest, response: Response) => {
   const { postId, reactionType } = request.body
   const userId = request.user?.userId as any

   try {
      const foundPostToModifyLike = await PostModel.findById(postId)
      if (!foundPostToModifyLike) return response.status(404).json({ msg: 'nincs ilyen poszt' })

      const userLike = foundPostToModifyLike.likes.find(
         (like) => like.userId.toString() === userId.toString()
      )
      if (userLike) {
         userLike.reactionType[reactionType] = true
      } else {
         foundPostToModifyLike.likes.push({
            userId,
            reactionType: {
               isLike: false,
               isAngry: false,
               isCare: false,
               isHaha: false,
               isLove: false,
               isSad: false,
               isWow: false,
               [reactionType]: true,
            },
         })
      }

      response
         .status(200)
         .json({ msg: foundPostToModifyLike, ember: request.user, mit: request.body.reactionType })
   } catch (error) {
      response.status(500).json({ msg: 'Internal server error' })
   }
}
