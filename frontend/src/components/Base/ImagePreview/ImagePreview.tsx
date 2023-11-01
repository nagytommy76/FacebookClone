import React, { useState, useEffect, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'

import ImageView from './Includes/ImageView'

const ImagePreview: React.FC<{
   uploadedPictures: FileList | null
}> = ({ uploadedPictures }) => {
   const {
      postsReducer: {
         singlePost: { postedPicturesPath },
      },
   } = useContext(PostContext)
   const [selectedFilePreview, setSelectedFilePreview] = useState<string[] | null>(null)
   const [currentFilePreview, setCurrentFilePreview] = useState<string[] | null>(postedPicturesPath)

   useEffect(() => {
      if (!uploadedPictures) {
         setSelectedFilePreview(null)
         return
      }
      let objectUrl: string[] = []
      for (let index = 0; index < uploadedPictures.length; index++) {
         objectUrl.push(URL.createObjectURL(uploadedPictures[index]))
      }
      setSelectedFilePreview(objectUrl)
   }, [uploadedPictures])

   return (
      <>
         {selectedFilePreview !== null && (
            <ImageView
               selectedFilePreview={selectedFilePreview}
               setSelectedFilePreview={setSelectedFilePreview}
            />
         )}
         {currentFilePreview !== null && (
            <ImageView
               selectedFilePreview={currentFilePreview}
               setSelectedFilePreview={setCurrentFilePreview}
            />
         )}
      </>
   )
}

export default ImagePreview
