import type { Response, Request } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'
import BasePostController from './Base/basePost'

interface IRemovePostRequest extends Request {
   body: {
      postId: string
   }
}

export default class RemovePostsController extends BasePostController {
   removePostController = async (request: IRemovePostRequest, response: Response) => {
      const postId = request.body.postId
      const currentUserId = request.user?.userId as string
      try {
         const result = await PostModel.deleteOne({ _id: postId, userId: currentUserId })
         response.status(200).json({ result })
      } catch (error) {
         console.log(error)
         response.status(500).json(error)
      }
   }
}
