import { useMutation } from '@tanstack/react-query'
import usePostMutationFn from './usePostMutationFn'

const usePostMutate = (
   description: string,
   postedPicturesPath: FileList | null,
   handleSnackOpenIfSuccess: () => void,
   handleDialogCloseOnSuccess: () => void
) => {
   const handlePostSend = usePostMutationFn(description, postedPicturesPath)

   const { mutate, isLoading } = useMutation({
      mutationKey: ['post'],
      mutationFn: handlePostSend,
      onSuccess: async () => {
         handleSnackOpenIfSuccess()
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
