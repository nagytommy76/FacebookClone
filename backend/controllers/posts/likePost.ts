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

const TESTOBJECT: {
   [index: string]: any
} = [
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: true,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: true,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: true,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: true,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: true,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: true,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: true,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: true,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: true,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      _id: '648487373714f88d348f6704',
      userId: '64777ef1c3038faf5e1a41c6',
      reactionType: {
         isAngry: true,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
]

export const getPostLikesByTypeAndCountController = async (request: IGetLikesRequest, response: Response) => {
   const { postId } = request.body

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

   const reactionTypes: {
      [index: string]: { count: number; reactors: string[] }
   } = {}
   // postLikes.likes.map((like) => {
   //    Object.entries(like.reactionType).map((keyValue) => {
   //       if (like.reactionType[keyValue[0]] === true) {
   //          Object.defineProperty(reactionTypes, keyValue[0], {
   //             value: {
   //                count: reactionTypes[keyValue[0]]++ || 1,
   //                reactors: like.userId,
   //             },
   //             writable: true,
   //          })
   //          console.log(reactionTypes)
   //       }
   //    })
   // })
   TESTOBJECT.map((like: any) => {
      Object.entries(like.reactionType).map((keyValue) => {
         if (like.reactionType[keyValue[0]] === true) {
            if (reactionTypes[keyValue[0]] === undefined) {
               reactionTypes[keyValue[0]] = {
                  count: 1,
                  reactors: like.userId,
               }
            } else {
               reactionTypes[keyValue[0]].count++
            }
         }
      })
   })
   console.log(reactionTypes)

   return response.status(200).json(reactionTypes)
}
export const getPostCommentsLikesByTypeAndCountController = () => {
   // const post = await PostModel.aggregate([
   //    { $match: { _id: new Types.ObjectId(postId) } },
   // {
   //    $project: {
   //       comments: {
   //          $filter: {
   //             input: '$comments',
   //             as: 'foundComment',
   //             cond: { $eq: ['$$foundComment._id', new Types.ObjectId(commentId)] },
   //          },
   //       },
   //    },
   // },
   // {
   //    $unwind: {
   //       path: '$comments',
   //    },
   // },
   // { $project: { 'comments.likes': 1 } },
   // {
   //    $lookup: {
   //       from: 'users',
   //       localField: 'comments.likes.userId',
   //       foreignField: '_id',
   //       as: 'comments.likes.userId',
   //    },
   // },
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
   // ])
}
