import { useMutation } from '@tanstack/react-query'
import useModifyPostFn from './useModifyPostFn'

interface IMutationFn {
   postDescription: string
   modifiedImageLinks: string[] | null
   newUploadedImages: File[] | null
}

const useModifyPost = ({ modifiedImageLinks, postDescription, newUploadedImages }: IMutationFn) => {
   const mutatePostFn = useModifyPostFn(modifiedImageLinks, postDescription, newUploadedImages)

   const { mutate } = useMutation({
      mutationKey: ['postUpdate'],
      mutationFn: mutatePostFn,
      onSuccess(data, variables, context) {
         //  Itt ki kell törölnöm a már meglévő képekből kitörölteket firebaseről
         console.log(data.data)
      },
   })
   return { updatePostMutate: mutate }
}

export default useModifyPost
