import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/axios/AxiosInstance'
import useUploadFirebase from '@/src/hooks/useUploadFirebase'
import useDeleteImage from '@/src/hooks/useDeleteImage'

import { CommentContext } from '@/CommentContext/CommentContext'

const useUpdateCommentMutate = (
   modifiedText: string,
   modifiedImageLink: FileList | null,
   setStatesToDefault: () => void,
   setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         removedImageLink,
         singleComment: { _id, commentImage },
      },
   } = useContext(CommentContext)
   // Egyelőre. Ezt inkább state-tel kéne!?
   let newUploadedImage: string | null = null

   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const deleteImageFromFirebase = useDeleteImage()

   const updateMutateFn = async () => {
      if (modifiedImageLink !== null) {
         newUploadedImage = await handleSingleImageUploadToFirebase(modifiedImageLink[0], postId, true)
      }
      const response = (await axios.put('/post/edit/update-post-comment', {
         postId,
         commentId: _id,
         modifiedText,
         commentImage: modifiedImageLink !== null ? newUploadedImage : commentImage,
      })) as AxiosResponse<{ modifiedComment: string; uploadedImageLink: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateComment'],
      mutationFn: updateMutateFn,
      onSuccess: async (data) => {
         // Feltölteni a képet mert van új és kicserélni ha nem törli a régit!?
         if (removedImageLink !== null) deleteImageFromFirebase([removedImageLink])
         commentDispatch({ type: 'SET_REMOVED_IMG_LINK', payload: null })
         // Itt letörlöm a meglévő képet ha esetleg nem törölte volna le a user
         if (commentImage !== null) await deleteImageFromFirebase([commentImage])

         commentDispatch({ payload: modifiedText, type: 'UPDATE_COMMENT_TEXT' })
         commentDispatch({ payload: data.uploadedImageLink, type: 'SET_COMMENT_IMAGE' })
         setStatesToDefault()
      },
      onError: async (error, variables, context) => {
         //  Esetleg itt egy kép törlése firebase-ről, ha nem sikerül a backend-en valami
         setIsError(true)
         if (newUploadedImage !== null) await deleteImageFromFirebase([newUploadedImage])
         setStatesToDefault()
         setTimeout(() => setIsError(false), 7500)
      },
   })

   const updateCommentMutate = () => mutate()

   return updateCommentMutate
}

export default useUpdateCommentMutate
