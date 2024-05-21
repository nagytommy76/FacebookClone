import type { ILike, IReactionTypes, LikeTypes } from './Types'

interface IReactionCount {
   [index: string]: { count: number; reactors: any[] }
}

export default abstract class BaseLikeController {
   private findPreviousReactionType(reactionType: IReactionTypes) {
      return Object.keys(reactionType).filter((key) => reactionType[key])[0] as LikeTypes
   }

   public countLikeReactions(reactionTypes: IReactionCount) {
      let totalReactionCount = 0
      Object.values(reactionTypes).forEach((value) => {
         totalReactionCount += value.count
      })
      return totalReactionCount
   }

   findUsersLikeByUserID(likes: ILike[], userId: string) {
      return likes.find((like) => like.userId.toString() === userId.toString())
   }

   public getLikesByReactionType(likes: ILike[]) {
      const reactionTypes: IReactionCount = {}
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

   public getFilteredLikesByUserId(likes: ILike[], userId: string) {
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

   checkUserLike(userLike: ILike | undefined, reactionType: LikeTypes, likes: ILike[], userId: any) {
      if (userLike) {
         let previousReaction = this.findPreviousReactionType(userLike.reactionType)
         userLike.reactionType[previousReaction] = false
         userLike.reactionType[reactionType] = true
      } else {
         likes.push({
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
   }
}
