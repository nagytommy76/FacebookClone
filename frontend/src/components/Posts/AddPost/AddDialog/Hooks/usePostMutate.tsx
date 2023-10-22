import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import usePostMutationFn from './usePostMutationFn'
import type { IPost } from '@/types/PostTypes'

const usePostMutate = (
   description: string,
   postedPicturesPath: FileList | null,
   handleSnackOpenIfSuccess: () => void,
   handleDialogCloseOnSuccess: () => void,
   setIsSendBtnDisabled: Dispatch<SetStateAction<boolean>>,
   addNewPost: (newPost: IPost) => void
) => {
   const handlePostSend = usePostMutationFn(description, postedPicturesPath)

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
