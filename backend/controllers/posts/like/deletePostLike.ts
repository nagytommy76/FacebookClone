import { Response } from 'express'
import { Posts as PostModel } from '../../../models/posts/posts'
import BaseLikeController from '../Base/baseLike'

import type { IPostRemoveLikeRequest } from '../types/PostTypes'
import type { ICommentLikeRequest } from '../types/PostTypes'

export default class DeleteLikePost extends BaseLikeController {
   deleteLikeFromPostController = async (request: IPostRemoveLikeRequest, response: Response) => {
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
         await foundPost.save()
         response.status(200).json(removedUserLikesID)
      } catch (error) {
         response.status(500).json({ msg: 'Internal server error' })
      }
   }

   deleteLikeCommentController = async (request: ICommentLikeRequest, response: Response) => {
      const { commentId, postId } = request.body
      const userId = request.user?.userId
      try {
         const foundPostsComment = await PostModel.find({
            _id: postId,
            comments: { $elemMatch: { _id: commentId } },
         }).select(['comments.$'])
         if (!foundPostsComment) return response.status(404).json({ msg: 'nincs ilyen poszt' })

         let removedUserLikesID = ''
         foundPostsComment[0].comments[0].likes = foundPostsComment[0].comments[0].likes.filter((like) => {
            if (like.userId.toString() !== (userId as string).toString()) {
               removedUserLikesID = like._id as string
               return true
            } else return false
         })

         response.status(200).json({ msg: 'KOMMENT TÖRLÉSE', foundPostsComment })
      } catch (error) {
         response.status(500).json(error)
      }
   }
}
