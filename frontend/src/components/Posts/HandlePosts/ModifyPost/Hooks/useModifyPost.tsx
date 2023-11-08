import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useModifyPostFn from './useModifyPostFn'
import useDeleteFirebase from '../../Hooks/useDeleteFirebase'

interface IMutationFn {
   postDescription: string
   modifiedImageLinks: string[] | null
   newUploadedImages: File[] | null
}

const useModifyPost = ({ modifiedImageLinks, postDescription, newUploadedImages }: IMutationFn) => {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const mutatePostFn = useModifyPostFn(modifiedImageLinks, postDescription, newUploadedImages)
   const { deleteImagesFromFirebase } = useDeleteFirebase()

   const { mutate } = useMutation({
      mutationKey: ['postUpdate'],
      mutationFn: mutatePostFn,
      onMutate(variables) {
         setIsLoading(true)
         console.log(variables)
      },
      onSuccess(data, variables, context) {
         //  Itt ki kell törölnöm a már meglévő képekből kitörölteket firebaseről
         deleteImagesFromFirebase()
         console.log(data.data)
         setIsLoading(false)
      },
   })
   return { updatePostMutate: mutate }
}

export default useModifyPost
