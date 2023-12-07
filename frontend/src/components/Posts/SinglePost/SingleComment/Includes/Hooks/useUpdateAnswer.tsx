import { useContext, Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/axios/AxiosInstance'

import { AnswerContext } from '@/AnswersContext/AnswersContext'
import useUploadFirebase from '@/src/hooks/useUploadFirebase'
import useDeleteImage from '@/src/hooks/useDeleteImage'

const useUpdateAnswer = (
   modifiedText: string,
   modifiedImageLink: FileList | null,
   answerId: string,
   setStatesToDefault: () => void,
   setIsError: Dispatch<SetStateAction<boolean>>
) => {
   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const deleteImageFromFirebase = useDeleteImage()

   const {
      answerDispatch,
      getAnswerImageById,
      answerReducer: { removedAnswerImageLink, postId, commentId },
   } = useContext(AnswerContext)
   let newUploadedImage: string | null = null

   const updateAnswerMutateFn = async () => {
      if (modifiedImageLink !== null) {
         newUploadedImage = await handleSingleImageUploadToFirebase(modifiedImageLink[0], postId, true)
      }
      const response = (await axios.put('/post/edit/update-post-comment-answer', {
         postId,
         commentId,
         modifiedText,
         commentAnswerId: answerId,
         commentImage: modifiedImageLink !== null ? newUploadedImage : null,
      })) as AxiosResponse<{ modifiedComment: string; uploadedImageLink: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateCommentAnswer'],
      mutationFn: updateAnswerMutateFn,
      onSuccess: async (data) => {
         // Feltölteni a képet mert van új és kicserélni ha nem törli a régit!?
         if (removedAnswerImageLink !== null) deleteImageFromFirebase([removedAnswerImageLink])
         answerDispatch({ type: 'SET_REMOVED_ANSWER_IMG_LINK', payload: null })
         // Itt letörlöm a meglévő képet ha esetleg nem törölte volna le a user
         const answerImage = getAnswerImageById(answerId)
         if (answerImage !== null && answerImage !== undefined) await deleteImageFromFirebase([answerImage])

         answerDispatch({
            type: 'UPDATE_SINGLE_COMMENT_ANSWER',
            payload: { modifiedText, answerID: answerId, commentImage: data.uploadedImageLink },
         })
         setStatesToDefault()
      },
      onError: async () => {
         //  Esetleg itt egy kép törlése firebase-ről, ha nem sikerül a backend-en valami
         setIsError(true)
         if (newUploadedImage !== null) await deleteImageFromFirebase([newUploadedImage])
         setStatesToDefault()
         setTimeout(() => setIsError(false), 7500)
      },
   })

   return mutate
}

export default useUpdateAnswer
