import { Response } from 'express'
import { Posts as PostModel } from '../../models/posts/posts'

import { IPostRequest } from './PostTypes'

/**
 * a userId az accessToken decoded fog jönni
 */
export const savePostController = (req: IPostRequest, res: Response) => {
   console.log(req.user)
   const { description, postedPicturesPath } = req.body
   res.status(200).json({ description, postedPicturesPath })
}
