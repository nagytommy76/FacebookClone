import { Response } from 'express'
import { Posts as PostModel } from '../../../models/posts/posts'
import type { IPostLikeRequest, IGetLikesRequest } from '../types/PostTypes'

import BaseLikeController from '../Base/baseLike'

export default class LikePost extends BaseLikeController {
   getPostLikesByTypeAndCountController = async (request: IGetLikesRequest, response: Response) => {
      const { postId } = request.body
      try {
         const postLikes = await PostModel.findById(postId)
            .select('likes')
            .populate({
               path: 'likes.userId',
               select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })
         if (!postLikes) return response.status(404).json({ msg: 'post not found' })
         const reactionTypes = this.getLikesByReactionType(postLikes.likes)
         const totalReactionCount = this.countLikeReactions(reactionTypes)

         return response.status(200).json({ reactionTypes, totalReactionCount })
      } catch (error) {
         response.status(500).json({ msg: 'Internal server error', error })
      }
   }

   getPostCommentsLikesByTypeAndCountController = async (request: IGetLikesRequest, response: Response) => {
      const { commentId, postId } = request.body
      try {
         const postCommentLikes = await PostModel.find({
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         })
            .select('comments.$')
            .populate({
               path: 'comments.likes.userId',
               select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
               match: {
                  'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
               },
            })
         if (!postCommentLikes) return response.status(404).json({ msg: 'post not found' })

         const reactionTypes = this.getLikesByReactionType(postCommentLikes[0].comments[0].likes)
         const totalReactionCount = this.countLikeReactions(reactionTypes)

         response.status(200).json({ reactionTypes, totalReactionCount })
      } catch (error) {
         response.status(500).json({ msg: 'Internal server error', error })
      }
   }

   likePostController = async (request: IPostLikeRequest, response: Response) => {
      const { postId, reactionType } = request.body
      const userId = request.user?.userId as any

      try {
         const foundPostToModifyLike = await this.findPostModelByPostId(postId)
         if (!foundPostToModifyLike) return response.status(404).json({ msg: 'nincs ilyen poszt' })

         const userLike = this.findUsersLikeByUserID(foundPostToModifyLike.likes, userId)
         this.checkUserLike(userLike, reactionType, foundPostToModifyLike.likes, userId)

         await foundPostToModifyLike.save()

         response.status(200).json(foundPostToModifyLike.likes)
      } catch (error) {
         response.status(500).json({ msg: 'Internal server error', error })
      }
   }
}