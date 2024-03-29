import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'

import usePostMutationFn from './usePostMutationFn'
import useUploadImage from './useUploadImage'
import type { IPost } from '@/types/PostTypes'

const usePostMutate = (
   description: string,
   handleSnackOpenIfSuccess: () => void,
   handleDialogCloseOnSuccess: () => void,
   setIsSendBtnDisabled: Dispatch<SetStateAction<boolean>>,
   addNewPost: (newPost: IPost) => void
) => {
   const handlePostSend = usePostMutationFn(description)
   const handleUploadNewImages = useUploadImage()

   const { mutate, isLoading } = useMutation({
      mutationKey: ['post'],
      mutationFn: handlePostSend,
      onSuccess: async (data) => {
         handleSnackOpenIfSuccess()
         setIsSendBtnDisabled(true)

         let createdPost = data.data.createdPost
         await handleUploadNewImages(createdPost)

         addNewPost(createdPost)
         setTimeout(() => {
            handleDialogCloseOnSuccess()
         }, 3000)
      },
   })

   return {
      postMutate: mutate,
      isLoading,
   }
}

export default usePostMutate
