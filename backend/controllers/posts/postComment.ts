import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import BasePostController from './Base/basePost'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export default class PostCommentController extends BasePostController {
   answerToCommentController = async (request: ISavePostCommentAnswerRequest, response: Response) => {
      const userId = request.user?.userId
      if (!userId) return response.status(404).json({ msg: 'User not found' })
      const { answeredAt, commentAnswer, postId, commentId, parentCommentId, commentDepth, commentImage } =
         request.body
      try {
         const foundPostComment = await this.findPostModelByPostId(postId)
         if (!foundPostComment) return response.status(404).json({ msg: `post not found by id: ${postId}` })

         const foundCommentIndex = foundPostComment.comments.findIndex((comment) => comment._id == commentId)
         foundPostComment.comments[foundCommentIndex].commentAnswers?.push({
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
      foundPost?.comments.push({
         comment,
         userId,
         parentCommentId: null,
         commentDepth: 1,
         likes: [],
         answeredAt,
         commentImage,
         commentAnswers: [],
      })
      await foundPost?.save()
      await foundPost?.populate({
         path: 'comments.userId',
         select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })
      await foundPost?.populate({
         path: 'comments.commentAnswers.userId',
         select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })
      response.status(200).json({ comments: foundPost?.comments })
   } catch (error) {
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
      parentCommentId: string
      commentAnswer: string
      answeredAt: string
      commentImage: string | null
   }
}
