import { Response } from 'express'
import { Posts as PostModel } from '../../../../models/posts/posts'
import BaseLikeController from '../../Base/baseLike'

import type { IPostRemoveLikeRequest } from '../../types/PostTypes'

export default class DeleteLikePost extends BaseLikeController {
   deleteLikeFromPostController = async (request: IPostRemoveLikeRequest, response: Response) => {
      const { postId } = request.body
      const userId = request.user?.userId
      try {
         const foundPost = await PostModel.findById(postId)
         if (!foundPost) return response.status(404).json({ msg: 'nincs ilyen poszt' })

         const { filteredLikes, removedUserLikesID } = this.getFilteredLikesByUserId(
            foundPost.likes,
            userId as string
         )

         foundPost.likes = filteredLikes
         await foundPost.save()

         if (request.getUser !== undefined) {
            const toSendUser = request.getUser(foundPost.userId.toString()) as any
            if (toSendUser !== undefined) {
               request.ioSocket?.to(toSendUser.socketId).emit('dislikedPost', [
                  {
                     likeType: foundPost.likes,
                     postData: {
                        _id: foundPost._id,
                        description: foundPost.description,
                     },
                  },
               ])
            }
         }
         response.status(200).json({ removedUserLikesID, filteredLikes })
      } catch (error) {
         console.log(error)
         response.status(500).json({ msg: 'Internal server error' })
      }
   }
}
