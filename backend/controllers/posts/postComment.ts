import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import { User as UserModel } from '../../models/user/user'
import BasePostController from './Base/basePost'

import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import type { IOnlineFriends } from '../../config/socketIo'

export default class PostCommentController extends BasePostController {
   answerToCommentController = async (request: ISavePostCommentAnswerRequest, response: Response) => {
      const userId = request.user?.userId
      if (!userId) return response.status(404).json({ msg: 'User not found' })
      const { answeredAt, commentAnswer, postId, commentId, parentCommentId, commentDepth, commentImage } =
         request.body
      try {
         const foundPostComment = await PostModel.findById(postId)
         if (!foundPostComment) return response.status(404).json({ msg: `post not found by id: ${postId}` })

         const foundCommentIndex = foundPostComment.comments.findIndex((comment) => comment._id == commentId)
         foundPostComment.comments[foundCommentIndex].commentAnswers.push({
            answeredAt,
            comment: commentAnswer,
            commentDepth,
            commentImage,
            parentCommentId,
            likes: [],
            userId,
         })

         await foundPostComment.save()
         await foundPostComment.populate({
            path: 'comments.commentAnswers.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         response
            .status(200)
            .json({ createdCommentAnswer: foundPostComment.comments[foundCommentIndex].commentAnswers })
      } catch (error) {
         console.log(error)
         response.status(500).json({ error })
      }
   }
}

export const savePostComment = async (request: ISavePostRequest, response: Response) => {
   const userId = request.user?.userId
   const { comment, commentImage, postId, answeredAt } = request.body
   if (!userId) return response.status(404).json({ msg: 'User not found' })
   try {
      const foundPost = await PostModel.findById(postId)
      if (!foundPost) return response.status(404).json({ msg: 'Post not found' })
      foundPost.comments.push({
         comment,
         userId,
         parentCommentId: null,
         commentDepth: 1,
         likes: [],
         answeredAt,
         commentImage,
         commentAnswers: [],
      })
      await foundPost.save()
      await foundPost.populateCommentUserId()
      await foundPost.populateCommentAnswerUserId()

      // Who liked your post
      const likedUser = await UserModel.getUserByUserIdAndSelect(userId)

      const toSaveUsersNotification = await UserModel.getSaveNotification(
         foundPost._id,
         foundPost.userId,
         foundPost.description,
         likedUser[0].firstName,
         likedUser[0].sureName,
         likedUser[0]._id,
         likedUser[0].selectedProfilePicturePath[0].path,
         'isCommentLike'
      )

      if (request.getUser !== undefined) {
         const toSendUser = request.getUser(foundPost.userId.toString() as any) as IOnlineFriends
         if (toSendUser !== undefined) {
            request.ioSocket?.to(toSendUser.socketId).emit('addComment', {
               notifications: toSaveUsersNotification?.notifications,
               newComments: foundPost.comments,
            })
         }
      }

      response.status(200).json({ comments: foundPost.comments })
   } catch (error) {
      console.log(error)
      response.status(500).json({ error })
   }
}

interface ISavePostRequest extends IJWTUserType {
   body: {
      postId: string
      comment: string
      commentImage: string | null
      answeredAt: string
   }
}

interface ISavePostCommentAnswerRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
      commentDepth: number
      parentCommentId: string | null
      commentAnswer: string
      answeredAt: string
      commentImage: string | null
   }
}
