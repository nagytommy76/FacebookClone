import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import useUploadFirebase from '@/src/hooks/useUploadFirebase'
import useDeleteImage from '@/src/hooks/useDeleteImage'

import { CommentContext } from '../../Context/CommentContext'

const useUpdateCommentMutate = (
   modifiedText: string,
   modifiedImageLink: FileList | null,
   setStatesToDefault: () => void
) => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         removedImageLink,
         singleComment: { _id, commentImage },
      },
   } = useContext(CommentContext)
   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const deleteImageFromFirebase = useDeleteImage()

   const updateMutateFn = async () => {
      let newUploadedImage: string | null = null
      if (removedImageLink !== null) deleteImageFromFirebase([removedImageLink])
      commentDispatch({ type: 'SET_REMOVED_IMG_LINK', payload: null })
      if (modifiedImageLink !== null) {
         // Itt letörlöm a meglévő képet ha esetleg nem törölte volna le a user
         if (commentImage !== null) deleteImageFromFirebase([commentImage])
         // Feltölteni a képet mert van új és kicserélni ha nem törli a régit!?
         newUploadedImage = await handleSingleImageUploadToFirebase(modifiedImageLink[0], postId, true)
      }
      const response = (await axios.put('/post/edit/update-post-comment', {
         postId,
         commentId: _id,
         modifiedText,
         commentImage: modifiedImageLink !== null ? newUploadedImage : commentImage,
         // newUploadedImage,
      })) as AxiosResponse<{ modifiedComment: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateComment'],
      mutationFn: updateMutateFn,
      onSuccess(data) {
         commentDispatch({ payload: modifiedText, type: 'UPDATE_COMMENT_TEXT' })
         setStatesToDefault()
      },
   })

   const updateCommentMutate = () => mutate()

   return updateCommentMutate
}

export default useUpdateCommentMutate
