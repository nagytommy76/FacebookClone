import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/axios/AxiosInstance'

import { CommentContext } from '@/CommentContext/CommentContext'
import useUploadFirebase from '@/src/hooks/useUploadFirebase'
import useDeleteImage from '@/src/hooks/useDeleteImage'

const useUpdateAnswer = (
   modifiedText: string,
   modifiedImageLink: FileList | null,
   setStatesToDefault: () => void
) => {
   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const deleteImageFromFirebase = useDeleteImage()

   const {
      commentDispatch,
      commentReducer: {
         postId,
         removedImageLink,
         singleComment: { _id },
      },
   } = useContext(CommentContext)
   let newUploadedImage: string | null = null

   const updateAnswerMutateFn = async (answerId: string) => {
      if (modifiedImageLink !== null) {
         newUploadedImage = await handleSingleImageUploadToFirebase(modifiedImageLink[0], postId, true)
      }
      const response = (await axios.put('/post/edit/update-post-comment-answer', {
         postId,
         commentId: _id,
         modifiedText,
         commentAnswerId: answerId,
      })) as AxiosResponse<{ modifiedComment: string; uploadedImageLink: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateCommentAnswer'],
      mutationFn: updateAnswerMutateFn,
      onSuccess: async (data, variables) => {
         // Feltölteni a képet mert van új és kicserélni ha nem törli a régit!?
         if (removedImageLink !== null) deleteImageFromFirebase([removedImageLink])
         commentDispatch({ type: 'SET_REMOVED_IMG_LINK', payload: null })
         // Itt letörlöm a meglévő képet ha esetleg nem törölte volna le a user
         //   if (commentImage !== null) await deleteImageFromFirebase([commentImage])

         commentDispatch({
            type: 'UPDATE_SINGLE_COMMENT_ANSWER',
            payload: { modifiedText, answerID: variables, commentImage: data.uploadedImageLink },
         })
         setStatesToDefault()
      },
   })

   return mutate
}

export default useUpdateAnswer
