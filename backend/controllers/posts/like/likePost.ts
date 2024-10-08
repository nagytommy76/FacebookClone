import { Response } from 'express'
import { Posts as PostModel } from '../../../models/posts/posts'
import { User as UserModel } from '../../../models/user/user'
import type { IPostLikeRequest, IGetLikesRequest, IGetAnswerLikesRequest } from '../types/PostTypes'

import BasePostController from '../Base/basePost'

export default class LikePost extends BasePostController {
   getPostLikesByTypeAndCountController = async (request: IGetLikesRequest, response: Response) => {
      const { postId } = request.body
      try {
         const postLikes = await PostModel.findById(postId).selectAndPopulateUserPicure(
            'likes',
            'likes.userId'
         )
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
         const postCommentLikes = await PostModel.findOne({
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         }).selectAndPopulateUserPicure('comments.$', 'comments.likes.userId')

         if (!postCommentLikes) return response.status(404).json({ msg: 'post not found' })

         const reactionTypes = this.getLikesByReactionType(postCommentLikes.comments[0].likes)
         const totalReactionCount = this.countLikeReactions(reactionTypes)

         response.status(200).json({ reactionTypes, totalReactionCount })
      } catch (error) {
         response.status(500).json({ msg: 'Internal server error', error })
      }
   }

   getPostCommentAnswersLikesByTypeAndCountController = async (
      request: IGetAnswerLikesRequest,
      response: Response
   ) => {
      const { postId, answerId, commentId } = request.body
      try {
         const postCommentAnswerLikes = await PostModel.findOne({
            _id: postId,
            comments: { $elemMatch: { _id: commentId, 'commentAnswers._id': answerId } },
         }).selectAndPopulateUserPicure('comments.commentAnswers.$', 'comments.commentAnswers.likes.userId')

         if (!postCommentAnswerLikes) return response.status(404).json({ msg: 'post not found' })

         const foundCommentAnswer = postCommentAnswerLikes.comments[0].commentAnswers.find((answer) => {
            return answer._id == answerId
         })
         if (!foundCommentAnswer) return response.status(404).json({ msg: 'commentAnswer not found' })

         const reactionTypes = this.getLikesByReactionType(foundCommentAnswer.likes)
         const totalReactionCount = this.countLikeReactions(reactionTypes)

         response.status(200).json({ reactionTypes, totalReactionCount })
      } catch (error) {
         console.log(error)
         response.status(500).json({ msg: 'Internal server error', error })
      }
   }

   likePostController = async (request: IPostLikeRequest, response: Response) => {
      const { postId, reactionType } = request.body
      const userId = request.user?.userId as string

      try {
         const foundPostToModifyLike = await PostModel.findById(postId)
         if (!foundPostToModifyLike) return response.status(404).json({ msg: 'nincs ilyen poszt' })

         const userLike = this.findUsersLikeByUserID(foundPostToModifyLike.likes, userId)
         this.checkUserLike(userLike, reactionType, foundPostToModifyLike.likes, userId)
         await foundPostToModifyLike.save()

         // Who liked your post
         const likedUser = await UserModel.getUserByUserIdAndSelect(userId)

         // SAVE TO DB --------------------------------
         let toSaveNotification
         if (foundPostToModifyLike.userId.toString() != userId) {
            toSaveNotification = await UserModel.getSaveNotification(
               foundPostToModifyLike._id,
               foundPostToModifyLike.userId,
               foundPostToModifyLike.description,
               likedUser[0].firstName,
               likedUser[0].sureName,
               likedUser[0]._id,
               likedUser[0].selectedProfilePicturePath[0].path,
               'isPostLike'
            )
         }

         // SOCKET ---------------------------
         if (request.getUser !== undefined) {
            const toSendUser = request.getUser(foundPostToModifyLike.userId.toString()) as {
               userId: string
               socketId: string
            }
            if (toSendUser !== undefined && toSendUser.userId != userId) {
               request.ioSocket?.to(toSendUser.socketId).emit('likedPost', {
                  notifications: toSaveNotification?.notifications,
                  likeType: foundPostToModifyLike.likes,
                  toModifyPostId: foundPostToModifyLike.id,
               })
            }
         }
         response.status(200).json(foundPostToModifyLike.likes)
      } catch (error) {
         console.log(error)
         response.status(500).json({ msg: 'Internal server error', error })
      }
   }
}
