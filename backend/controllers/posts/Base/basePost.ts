import { Posts as PostModel } from '../../../models/posts/posts'
import BaseLikeController from '../../Base/BaseLikeController'

export default abstract class BasePostController extends BaseLikeController {
   async returnPostModelWithPopulated(userId: string | null = null) {
      const allPosts = await PostModel.find(userId ? { userId } : {})
         // Ezt egyelőre: Meg tudjam számolni a commenteket, később egy lekérdezésben
         .select([
            '-comments.answeredAt',
            '-comments.comment',
            '-comments.commentAnswers',
            '-comments.commentImage',
            '-comments.likes',
            '-comments.userId',
         ])
         .populateUserIdWithProfilePicture('userId')
         .lean()
      return allPosts
   }
}
