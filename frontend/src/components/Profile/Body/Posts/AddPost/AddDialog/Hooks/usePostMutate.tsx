import { useMutation } from '@tanstack/react-query'
import usePostMutationFn from './usePostMutationFn'

const usePostMutate = (description: string, postedPicturesPath: FileList | null, handleClose: () => void) => {
   const handlePostSend = usePostMutationFn(description, postedPicturesPath)

   const { mutate, isLoading } = useMutation({
      mutationKey: ['post'],
      mutationFn: handlePostSend,
      onSuccess: async () => {
         handleClose()
      },
   })

   return {
      postMutate: mutate,
      isLoading,
   }
}

export default usePostMutate
