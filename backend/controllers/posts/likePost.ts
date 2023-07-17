import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import { Types } from 'mongoose'
import type {
   IPostLikeRequest,
   IPostRemoveLikeRequest,
   IReactionTypes,
   LikeTypes,
   IGetLikesRequest,
} from './types/PostTypes'

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

      await foundPostToModifyLike.save()

      response.status(200).json(foundPostToModifyLike.likes)
   } catch (error) {
      response.status(500).json({ msg: 'Internal server error' })
   }
}

export const deleteLikeFromPostController = async (request: IPostRemoveLikeRequest, response: Response) => {
   const { postId } = request.body
   const userId = request.user?.userId
   try {
      const foundPost = await PostModel.findById(postId)
      if (!foundPost) return response.status(404).json({ msg: 'nincs ilyen poszt' })

      let removedUserLikesID = ''
      const filteredLikes = foundPost.likes.filter((like) => {
         if (like.userId.toString() !== (userId as string).toString()) {
            removedUserLikesID = like._id as string
            return true
         } else return false
      })
      foundPost.likes = filteredLikes
      const savedPost = await foundPost.save()
      response.status(200).json(removedUserLikesID)
   } catch (error) {
      response.status(500).json({ msg: 'Internal server error' })
   }
}

export const getCommentLikesByTypeAndCountController = async (
   request: IGetLikesRequest,
   response: Response
) => {
   const { postId, commentId } = request.body

   const post = await PostModel.aggregate([
      { $match: { _id: new Types.ObjectId(postId) } },
      {
         $project: {
            comments: {
               $filter: {
                  input: '$comments',
                  as: 'foundComment',
                  cond: { $eq: ['$$foundComment._id', new Types.ObjectId(commentId)] },
               },
            },
         },
      },
      {
         $unwind: {
            path: '$comments',
         },
      },
      { $project: { 'comments.likes': 1 } },
      {
         $lookup: {
            from: 'users',
            localField: 'comments.likes.userId',
            foreignField: '_id',
            as: 'comments.likes.userId',
         },
      },
      // {
      //    $group: {
      //       _id: null,
      //       isLike: { $addToSet: '$comments.likes.reactionType.isLike' },
      //       isAngry: { $addToSet: '$comments.likes.reactionType.isAngry' },
      //    },
      // },
      // {
      //    $unwind: {
      //       path: '$isAngry',
      //    },
      // },
   ])

   return response.status(200).json(post)
}
