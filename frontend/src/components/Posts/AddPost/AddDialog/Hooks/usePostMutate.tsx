import { useContext, Dispatch, SetStateAction } from 'react'
import { ImageContext } from '../../../HandlePosts/Context/ImageContextProvider'
import { useMutation } from '@tanstack/react-query'
import usePostMutationFn from './usePostMutationFn'
import type { IPost } from '@/types/PostTypes'

const usePostMutate = (
   description: string,
   handleSnackOpenIfSuccess: () => void,
   handleDialogCloseOnSuccess: () => void,
   setIsSendBtnDisabled: Dispatch<SetStateAction<boolean>>,
   addNewPost: (newPost: IPost) => void
) => {
   const {
      imageReducer: { newUploadedImages },
   } = useContext(ImageContext)
   const handlePostSend = usePostMutationFn(description, newUploadedImages)

   const { mutate, isLoading } = useMutation({
      mutationKey: ['post'],
      mutationFn: handlePostSend,
      onSuccess: async (data) => {
         handleSnackOpenIfSuccess()
         setIsSendBtnDisabled(true)
         addNewPost(data.data.createdPost)
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
