import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import BasePostController from './basePost'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import type { ICommentLikeRequest, LikeTypes, IReactionTypes } from './PostTypes'

export default class PostCommentController extends BasePostController {
   likeCommentController = async (request: ICommentLikeRequest, response: Response) => {
      const { commentId, postId, reactionType } = request.body
      const userId = request.user?.userId as string | any
      try {
         // https://www.mongodb.com/community/forums/t/how-to-only-get-the-array-nested-subdocuments-with-that-document-id-and-not-having-to-iterate-through-it/100197
         const foundPostToModifyLike = await this.findPostModelByPostId(postId)
         if (!foundPostToModifyLike) return response.status(404).json({ msg: 'Post comment not found' })

         const commentLikeIndex = foundPostToModifyLike.comments.findIndex((comment) => {
            return comment._id?.toString() === commentId.toString()
         })
         const userLike = this.findUsersLikeByUserID(
            foundPostToModifyLike.comments[commentLikeIndex].likes,
            userId
         )
         this.checkUserLike(
            userLike,
            reactionType,
            foundPostToModifyLike.comments[commentLikeIndex].likes,
            userId
         )

         await foundPostToModifyLike.save()
         await foundPostToModifyLike.populate({
            path: 'comments.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         response.status(200).json(foundPostToModifyLike.comments[commentLikeIndex].likes)
      } catch (error) {
         console.log(error)
         response.status(500).json({ error })
      }
   }

   answerToCommentController = async (request: ISavePostCommentAnswerRequest, response: Response) => {
      const userId = request.user?.userId
      const { answeredAt, commentAnswer, postId } = request.body
      try {
         const post = await this.findPostModelByPostId(postId)
      } catch (error) {
         console.log(error)
         response.status(500).json({ error })
      }
   }
}

export const savePostComment = async (request: ISavePostRequest, response: Response) => {
   const userId = request.user?.userId
   const { comment, postId, answeredAt } = request.body
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
      })
      await foundPost?.save()
      await foundPost?.populate({
         path: 'comments.userId',
         select: ['firstName', 'sureName', 'userDetails.profilePicturePath'],
         match: {
            'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
         },
      })
      response.status(200).json({ comments: foundPost?.comments })
   } catch (error) {
      response.status(500).json({ error })
   }
}

const findPreviousReactionType = (reactionType: IReactionTypes) => {
   return Object.keys(reactionType).filter((key) => reactionType[key])[0] as LikeTypes
}

interface ISavePostRequest extends IJWTUserType {
   body: {
      postId: string
      comment: string
      answeredAt: string
   }
}

interface ISavePostCommentAnswerRequest extends IJWTUserType {
   body: {
      postId: string
      commentAnswer: string
      answeredAt: string
   }
}
