import React from 'react'
import { ref, deleteObject } from 'firebase/storage'
import { firebaseStorage } from '@/utils/firebase/firebase'

const useRemoveImages = () => {
   const deleteAllImagesFromFirebase = async (postedPicturesPath: string[] | null) => {
      if (postedPicturesPath !== null) {
         postedPicturesPath.map(async (singleImage) => {
            const imageReference = ref(firebaseStorage, singleImage)
            await deleteObject(imageReference)
         })
      }
   }
   return deleteAllImagesFromFirebase
}

export default useRemoveImages
