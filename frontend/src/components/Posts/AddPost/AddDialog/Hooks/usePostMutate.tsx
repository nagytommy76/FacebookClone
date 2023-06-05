import { useMutation } from '@tanstack/react-query'
import usePostMutationFn from './usePostMutationFn'
import type { IPost } from '../../../Types'

const usePostMutate = (
   description: string,
   postedPicturesPath: FileList | null,
   handleSnackOpenIfSuccess: () => void,
   handleDialogCloseOnSuccess: () => void,
   addNewPost: (newPost: IPost) => void
) => {
   const handlePostSend = usePostMutationFn(description, postedPicturesPath)

   const { mutate, isLoading } = useMutation({
      mutationKey: ['post'],
      mutationFn: handlePostSend,
      onSuccess: async (data) => {
         handleSnackOpenIfSuccess()
         addNewPost(data.data.createdPost)
         setTimeout(() => {
            handleDialogCloseOnSuccess()
         }, 5000)
      },
   })

   return {
      postMutate: mutate,
      isLoading,
   }
}

export default usePostMutate
