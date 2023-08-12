import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import type { ICommentAnswers } from '@/src/types/LikeTypes'
import { CommentContext } from '../../Context/CommentContext'
import { CommentActions } from '../../Context/CommentReducer'

const useAnswerCreateMutate = (
   commentDepth: number,
   parentCommentId: string | null,
   answerText: string,
   setStatesToDefault: () => void
) => {
   const handleCreateMutate = async () => {
      const response = (await axios.post('/post/add-comment-answer', {
         postId,
         commentId: _id,
         commentDepth,
         parentCommentId,
         answeredAt: new Date(),
         commentAnswer: answerText,
      })) as AxiosResponse<{ createdCommentAnswer: ICommentAnswers[] }>
      return response
   }
   const {
      commentDispatch,
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)

   const { mutate } = useMutation({
      mutationKey: ['saveAnswerText'],
      mutationFn: handleCreateMutate,
      onSuccess(data) {
         commentDispatch({
            type: CommentActions.ADD_SINGLE_COMMENT_ANSWER,
            payload: data.data.createdCommentAnswer,
         })
         setStatesToDefault()
      },
   })

   const saveAnswerMutate = () => mutate()

   return saveAnswerMutate
}

export default useAnswerCreateMutate
