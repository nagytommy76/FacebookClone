import { useState, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { ImageContext } from '../../Context/ImageContextProvider'
import { useMutation } from '@tanstack/react-query'
import useModifyPostFn from './useModifyPostFn'
import useDeleteFirebase from '../../Hooks/useDeleteFirebase'

interface IMutationFn {
   postDescription: string
   modifiedImageLinks: string[] | null
   newUploadedImages: File[] | null
   handleDialogCloseOnSuccess: () => void
}

const useModifyPost = ({
   modifiedImageLinks,
   postDescription,
   newUploadedImages,
   handleDialogCloseOnSuccess,
}: IMutationFn) => {
   const { postsDispatch } = useContext(PostContext)
   const {
      imageReducer: { uploadedImages },
   } = useContext(ImageContext)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const { handlePostMutateFn } = useModifyPostFn(modifiedImageLinks, postDescription, newUploadedImages)
   const { deleteImagesFromFirebase } = useDeleteFirebase()

   const { mutate } = useMutation({
      mutationKey: ['postUpdate'],
      mutationFn: handlePostMutateFn,
      onMutate(variables) {
         setIsLoading(true)
         console.log(variables)
      },
      async onSuccess(data, variables, context) {
         //  Itt ki kell törölnöm a már meglévő képekből kitörölteket firebaseről
         await deleteImagesFromFirebase()

         postsDispatch({ type: 'UPDATE_POSTED_PICTURES', payload: uploadedImages })
         postsDispatch({ type: 'UPDATE_POST_DESCRIPTION', payload: postDescription })

         setIsLoading(false)
         handleDialogCloseOnSuccess()
      },
   })
   return { updatePostMutate: mutate, isLoading }
}

export default useModifyPost
