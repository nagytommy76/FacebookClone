import { useMutation } from '@tanstack/react-query'
import usePostMutationFn from './usePostMutationFn'

const usePostMutate = (description: string, postedPicturesPath?: string[]) => {
   const handlePostSend = usePostMutationFn(description, postedPicturesPath)

   const { mutate, isLoading, data } = useMutation({
      mutationKey: ['post'],
      mutationFn: handlePostSend,
   })

   return {
      postMutate: mutate,
      isLoading,
      data,
   }
}

export default usePostMutate
