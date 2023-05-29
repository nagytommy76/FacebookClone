import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import type { ICommentLikeRequest, LikeTypes, IReactionTypes } from './PostTypes'

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

const findPreviousReactionType = (reactionType: IReactionTypes) => {
   return Object.keys(reactionType).filter((key) => reactionType[key])[0] as LikeTypes
}

export const likeCommentController = async (request: ICommentLikeRequest, response: Response) => {
   const { commentId, postId, reactionType } = request.body
   const userId = request.user?.userId as string | any
   try {
      // https://www.mongodb.com/community/forums/t/how-to-only-get-the-array-nested-subdocuments-with-that-document-id-and-not-having-to-iterate-through-it/100197
      const foundPostToModifyLike = await PostModel.findById(postId)
      if (!foundPostToModifyLike) return response.status(404).json({ msg: 'Post comment not found' })

      const commentLikeIndex = foundPostToModifyLike.comments.findIndex((comment) => {
         return comment._id?.toString() === commentId.toString()
      })

      const userLike = foundPostToModifyLike.comments[commentLikeIndex].likes.find(
         (like) => like.userId.toString() === userId.toString()
      )
      if (userLike) {
         let previousReaction = findPreviousReactionType(userLike.reactionType)
         userLike.reactionType[previousReaction] = false
         userLike.reactionType[reactionType] = true
      } else {
         foundPostToModifyLike.comments[commentLikeIndex].likes.push({
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
      await foundPostToModifyLike.save()
      response.status(200).json(foundPostToModifyLike.comments)
   } catch (error) {
      console.log(error)
      response.status(500).json({ error })
   }
}

interface ISavePostRequest extends IJWTUserType {
   body: {
      postId: string
      comment: string
   }
}
