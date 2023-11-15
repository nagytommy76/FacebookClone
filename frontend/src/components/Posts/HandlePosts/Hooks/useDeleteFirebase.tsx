import { useContext } from 'react'
import { ImageContext } from '../Context/ImageContextProvider'
import { PostContext } from '@/PostContext/PostContextProvider'

import useDeleteImage from './useDeleteImage'
import useGetDeletedImages from './useGetDeletedImages'

const useDeleteFirebase = () => {
   const {
      imageReducer: { uploadedImages, newUploadedImages },
   } = useContext(ImageContext)
   const {
      postsReducer: {
         singlePost: { postedPicturesPath },
      },
   } = useContext(PostContext)
   const deleteImagesHelper = useDeleteImage()
   const returnDeletedImages = useGetDeletedImages()

   const deleteImagesFromFirebase = async () => {
      const deletedImages = returnDeletedImages(postedPicturesPath, uploadedImages)
      if (deletedImages === null) return null
      await deleteImagesHelper(deletedImages)
   }

   const deleteAllImagesFromFirebase = async () => {
      if (uploadedImages === null && newUploadedImages === null && postedPicturesPath !== null) {
         await deleteImagesHelper(postedPicturesPath)
      }
   }

   return { deleteImagesFromFirebase, deleteAllImagesFromFirebase }
}

export default useDeleteFirebase
