import { Posts as PostModel } from '../../../models/posts/posts'
import BaseLikeController from '../../Base/BaseLikeController'

export default abstract class BasePostController extends BaseLikeController {
   public async findPostModelByPostId(postId: string) {
      return await PostModel.findById(postId)
   }
   async returnPostModelWithPopulated(userId: string | null = null) {
      // const allPosts = await PostModel.aggregate([
      //    { $match: userId ? { userId } : {} },
      //    {
      //       $lookup: {
      //          from: 'users',
      //          localField: 'userId',
      //          foreignField: '_id',
      //          as: 'userId',
      //          pipeline: [
      //             {
      //                $match: {
      //                   'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      //                },
      //             },
      //             {
      //                $project: {
      //                   firstName: 1,
      //                   sureName: 1,
      //                   'userDetails.profilePicturePath': 'userDetails.profilePicturePath.$',
      //                },
      //             },
      //          ],
      //       },
      //    },
      //    { $project: { comments: 0 } },
      // ])

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
         .populate({
            path: 'userId',
            select: ['email', '_id', 'sureName', 'firstName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         .populate({
            path: 'comments.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         .populate({
            path: 'comments.commentAnswers.userId',
            select: ['firstName', 'sureName', 'userDetails.profilePicturePath.$'],
            match: {
               'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
            },
         })
         .lean()
      return allPosts
   }
}
