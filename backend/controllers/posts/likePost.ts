import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import type { IPostLikeRequest, IReactionTypes, LikeTypes } from './PostTypes'

const findPreviousReactionType = (reactionType: IReactionTypes) => {
   return Object.keys(reactionType).filter((key) => reactionType[key])[0] as LikeTypes
}

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
         let previousReaction: LikeTypes
         previousReaction = findPreviousReactionType(userLike.reactionType)
         userLike.reactionType[previousReaction] = false
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

      const savedPostLike = await foundPostToModifyLike.save()

      response.status(200).json({ msg: 'sikeres reakció mentés, vagy módosítás', mit: savedPostLike })
   } catch (error) {
      response.status(500).json({ msg: 'Internal server error' })
   }
}