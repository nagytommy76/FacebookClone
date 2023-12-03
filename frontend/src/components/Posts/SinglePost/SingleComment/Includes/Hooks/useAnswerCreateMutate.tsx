import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import useUploadFirbase from '@/hooks/useUploadFirebase'
import { CommentContext } from '@/CommentContext/CommentContext'
import { AnswerContext } from '@/AnswerContext/AnswerContext'

import type { ICommentAnswers } from '@/src/types/LikeTypes'

const useAnswerCreateMutate = (
   commentImagePath: FileList | null,
   commentDepth: number,
   parentCommentId: string | null,
   answerText: string,
   setStatesToDefault: () => void
) => {
   const {
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)
   const { answerDispatch } = useContext(AnswerContext)
   const { handleSingleImageUploadToFirebase } = useUploadFirbase()

   const handleCreateMutate = async () => {
      let imagePath: string | null = null
      if (commentImagePath) {
         imagePath = await handleSingleImageUploadToFirebase(commentImagePath[0], postId, true)
      }
      const response = (await axios.post('/post/add-comment-answer', {
         postId,
         commentId: _id,
         commentDepth,
         parentCommentId,
         answeredAt: new Date(),
         commentImage: imagePath,
         commentAnswer: answerText,
      })) as AxiosResponse<{ createdCommentAnswer: ICommentAnswers[] }>
      return response
   }

   const { mutate } = useMutation({
      mutationKey: ['saveAnswerText'],
      mutationFn: handleCreateMutate,
      onSuccess(data) {
         answerDispatch({
            type: 'ADD_SINGLE_COMMENT_ANSWER',
            payload: data.data.createdCommentAnswer,
         })
         setStatesToDefault()
      },
   })

   const saveAnswerMutate = () => mutate()

   return saveAnswerMutate
}

export default useAnswerCreateMutate
