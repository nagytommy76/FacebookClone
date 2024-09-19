import { Posts as PostModel } from '../../models/posts/posts'
import type { Response, Request } from 'express'

interface IPostUpdateRequest extends Request {
   body: {
      postId: string
      postDescription: string
      modifiedImageLinks: string[] | null
      newAddedImageLinks: string[] | null
   }
}

export const updatePostController = async (request: IPostUpdateRequest, response: Response) => {
   const userId = request.user.userId
   const { postId, modifiedImageLinks, newAddedImageLinks, postDescription } = request.body
   try {
      let mergedImages: string[] | null = []

      if (modifiedImageLinks !== null) {
         mergedImages = mergedImages.concat(modifiedImageLinks)
      }
      if (newAddedImageLinks !== null) {
         mergedImages = mergedImages.concat(newAddedImageLinks)
      }
      if (newAddedImageLinks === null && modifiedImageLinks === null) {
         mergedImages = null
      }

      const foundPost = await PostModel.updateOne({ _id: postId, userId: userId }, [
         { $set: { description: postDescription } },
         { $set: { postedPicturesPath: mergedImages } },
      ])

      response.status(200).json({ newImagesLinks: mergedImages })
   } catch (error) {
      console.log(error)
      response.status(500).json({ error })
   }
}
