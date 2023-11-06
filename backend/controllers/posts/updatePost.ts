import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'

interface IPostUpdateRequest extends IJWTUserType {
   body: {
      postId: string
      postDescription: string
      modifiedImageLinks: string[] | null
      newAddedImageLinks: string[] | null
   }
}

export const updatePostController = async (request: IPostUpdateRequest, response: Response) => {
   const userId = request.user?.userId
   const { postId, modifiedImageLinks, newAddedImageLinks, postDescription } = request.body
   try {
      let mergedImages: string[] | null = []

      if (modifiedImageLinks !== null) {
         console.log(modifiedImageLinks)
         mergedImages = mergedImages.concat(modifiedImageLinks)
      }
      if (newAddedImageLinks !== null) {
         console.log(newAddedImageLinks)
         mergedImages = mergedImages.concat(newAddedImageLinks)
      }
      if (newAddedImageLinks && modifiedImageLinks === null) {
         console.log(mergedImages)
         mergedImages = null
      }

      const foundPost = await PostModel.updateOne({ _id: postId, userId: userId }, [
         { $set: { description: postDescription } },
         { $set: { postedPicturesPath: mergedImages } },
      ])

      response.status(200).json({ modifiedImageLinks, postDescription, foundPost })
   } catch (error) {
      console.log(error)
      response.status(500).json({ error })
   }
}
