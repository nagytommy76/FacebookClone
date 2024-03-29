import type { IPostLike } from '../types/PostTypes'
import BasePostController from './basePost'

interface IReactionTypes {
   [index: string]: { count: number; reactors: any[] }
}

export default abstract class BaseLikeController extends BasePostController {
   public getLikesByReactionType(likes: IPostLike[]) {
      const reactionTypes: IReactionTypes = {}
      try {
         likes.map((like) => {
            Object.entries(like.reactionType).map((keyValue) => {
               if (like.reactionType[keyValue[0]] === true) {
                  if (reactionTypes[keyValue[0]] === undefined) {
                     reactionTypes[keyValue[0]] = {
                        count: 1,
                        reactors: [like.userId],
                     }
                  } else {
                     reactionTypes[keyValue[0]].count++
                     // Hozzáadni a usereket
                     reactionTypes[keyValue[0]].reactors.push(like.userId)
                  }
               }
            })
         })
      } catch (error) {
         console.log(error)
      }
      return reactionTypes
   }

   public getFilteredLikesByUserId(likes: IPostLike[], userId: string) {
      let removedUserLikesID: string | null = null

      const filteredLikes = likes.filter((like) => {
         if (like.userId.toString() !== userId.toString()) {
            removedUserLikesID = like._id?.toString() as string
            return true
         } else return false
      })
      return {
         removedUserLikesID,
         filteredLikes,
      }
   }

   protected countLikeReactions(reactionTypes: IReactionTypes) {
      let totalReactionCount = 0
      Object.values(reactionTypes).forEach((value) => {
         totalReactionCount += value.count
      })
      return totalReactionCount
   }
}
