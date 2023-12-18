import React, { useEffect, useState, useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContextProvider'
import usePictureMutate from './usePictureMutate'
import useUploadFirebase from '@/hooks/useUploadFirebase'

const useCheckPicture = () => {
   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)
   const mutationFunction = usePictureMutate()
   const { handleSingleProfileImageUploadToFirebase } = useUploadFirebase()
   const {
      profileReducer: {
         initialUserDataState: { _id },
      },
   } = useContext(ProfileContext)

   useEffect(() => {
      if (!uploadedPictures) setIsButtonDisabled(true)
      else setIsButtonDisabled(false)
   }, [uploadedPictures])

   const addPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUploadedPictures(e.target.files)
   }
   const removePicture = () => {
      setUploadedPictures(null)
   }

   const handleSetUploadPictures = async () => {
      if (!uploadedPictures) return
      // Először feltöltöm az 1DB képet firebase/userId/profileImage mappába ha ez megvan ->
      const uploadedPicturePath = await handleSingleProfileImageUploadToFirebase(
         uploadedPictures.item(0) as File,
         _id
      )
      // Elküldöm az adatbázisnak a visszakapott url-t
      mutationFunction(uploadedPicturePath as string)
      setUploadedPictures(null)
   }

   return {
      isButtonDisabled,
      uploadedPictures,
      addPicture,
      removePicture,
      handleSetUploadPictures,
   }
}

export default useCheckPicture
