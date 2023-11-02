import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

interface IPostUpdateRequest extends IJWTUserType {
   body: {
      postDescription: string
      modifiedImageLinks: string[]
   }
}

export const updatePostController = (request: IPostUpdateRequest, response: Response) => {
   const { modifiedImageLinks, postDescription } = request.body

   response.status(200).json({ msg: 'Sikeres poszt módosítása' })
}
