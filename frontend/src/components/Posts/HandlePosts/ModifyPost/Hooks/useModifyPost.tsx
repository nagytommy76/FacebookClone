import { useState, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { ImageContext } from '../../Context/ImageContextProvider'
import { useMutation } from '@tanstack/react-query'
import useModifyPostFn from './useModifyPostFn'
import useDeleteFirebase from '../../Hooks/useDeleteFirebase'
interface IMutationFn {
   modifiedDescription: string
   modifiedImageLinks: string[] | null
   newUploadedImages: File[] | null
   handleDialogCloseOnSuccess: () => void
}

const useModifyPost = ({
   modifiedImageLinks,
   modifiedDescription,
   newUploadedImages,
   handleDialogCloseOnSuccess,
}: IMutationFn) => {
   const { postsDispatch } = useContext(PostContext)
   const {
      imageReducer: { uploadedImages },
   } = useContext(ImageContext)
   const [newFirebaseImageLinks, setNewFirebaseImageLinks] = useState<string[] | null>(null)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const { handlePostMutateFn } = useModifyPostFn(
      modifiedImageLinks,
      modifiedDescription,
      newUploadedImages,
      setNewFirebaseImageLinks
   )
   const { deleteImagesFromFirebase } = useDeleteFirebase()

   const { mutate } = useMutation({
      mutationKey: ['postUpdate'],
      mutationFn: handlePostMutateFn,
      onMutate(variables) {
         setIsLoading(true)
      },
      async onSuccess(data, variables, context) {
         //  Itt ki kell törölnöm a már meglévő képekből kitörölteket firebaseről
         await deleteImagesFromFirebase()
         console.log(newFirebaseImageLinks)

         // if (newUploadedImages === null)
         postsDispatch({ type: 'UPDATE_POSTED_PICTURES', payload: uploadedImages })
         postsDispatch({ type: 'UPDATE_POST_DESCRIPTION', payload: modifiedDescription })

         setIsLoading(false)
         handleDialogCloseOnSuccess()
      },
   })

   return { updatePostMutate: mutate, isLoading }
}

export default useModifyPost
