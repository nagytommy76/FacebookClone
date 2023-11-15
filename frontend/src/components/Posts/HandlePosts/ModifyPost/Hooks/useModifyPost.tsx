import { useState, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { ImageContext } from '../../Context/ImageContextProvider'
import { useMutation } from '@tanstack/react-query'
import useModifyPostFn from './useModifyPostFn'
import useDeleteFirebase from '../../Hooks/useDeleteFirebase'
interface IMutationFn {
   modifiedDescription: string
   handleDialogCloseOnSuccess: () => void
}

const useModifyPost = ({ modifiedDescription, handleDialogCloseOnSuccess }: IMutationFn) => {
   const { postsDispatch } = useContext(PostContext)
   const { imageDispatch } = useContext(ImageContext)
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const { handlePostMutateFn } = useModifyPostFn(modifiedDescription)
   const { deleteImagesFromFirebase } = useDeleteFirebase()

   const { mutate } = useMutation({
      mutationKey: ['postUpdate'],
      mutationFn: handlePostMutateFn,
      onMutate() {
         setIsLoading(true)
      },
      async onSuccess(data) {
         //  Itt ki kell törölnöm a már meglévő képekből kitörölteket firebaseről
         await deleteImagesFromFirebase()
         console.log(data.data.newImagesLinks)
         // Meg kell oldanom, ha az utolsó képet törlöm és nincs új akkor törölje firebase-ről... ez most nem müxik

         postsDispatch({ type: 'UPDATE_POSTED_PICTURES', payload: data.data.newImagesLinks })
         postsDispatch({ type: 'UPDATE_POST_DESCRIPTION', payload: modifiedDescription })
         imageDispatch({ type: 'UNSET_NEW_IMAGES' })

         setIsLoading(false)
         handleDialogCloseOnSuccess()
      },
   })

   return { updatePostMutate: mutate, isLoading }
}

export default useModifyPost
