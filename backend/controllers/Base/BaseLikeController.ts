import type { ILike, IReactionTypes, LikeTypes } from './Types'

export default abstract class BaseLikeController {
   private findPreviousReactionType(reactionType: IReactionTypes) {
      return Object.keys(reactionType).filter((key) => reactionType[key])[0] as LikeTypes
   }

   findUsersLikeByUserID(likes: ILike[], userId: string) {
      return likes.find((like) => like.userId.toString() === userId.toString())
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
