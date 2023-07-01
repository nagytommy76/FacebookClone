import { Posts as PostModel } from '../../models/posts/posts'
import type { IReactionTypes, LikeTypes, IPostLike } from './types/PostTypes'

export default abstract class BasePostController {
   public async findPostModelByPostId(postId: string) {
      return await PostModel.findById(postId)
   }

   private findPreviousReactionType(reactionType: IReactionTypes) {
      return Object.keys(reactionType).filter((key) => reactionType[key])[0] as LikeTypes
   }

   findUsersLikeByUserID(likes: IPostLike[], userId: string) {
      return likes.find((like) => like.userId.toString() === userId.toString())
   }

   checkUserLike(userLike: IPostLike | undefined, reactionType: LikeTypes, likes: IPostLike[], userId: any) {
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
