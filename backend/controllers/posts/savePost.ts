import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

import { PostRequest } from './PostTypes'

/**
 * a userId az accessToken decoded fog jönni
 */
export const savePostController = (req: PostRequest, res: Response) => {
   const { description, postedPicturesPath } = req.body
   res.status(200).json({ description, postedPicturesPath })
}
