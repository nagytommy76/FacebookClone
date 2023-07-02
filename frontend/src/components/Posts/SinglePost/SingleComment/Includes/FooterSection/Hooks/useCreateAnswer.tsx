import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import { CommentContext } from '../../../Context/CommentContext'
import { CommentActions } from '../../../Context/CommentReducer'
import { ICommentAnswers } from '@/src/types/LikeTypes'

const useCreateAnswer = (
   postId: string,
   commentId: string,
   commentDepth: number,
   parentCommentId: string | null,
   commentAnswer: string
) => {
   const { commentDispatch } = useContext(CommentContext)
   const handleMutate = async () => {
      const response = (await axios.post('/post/add-comment-answer', {
         postId,
         commentId,
         commentDepth,
         parentCommentId,
         answeredAt: new Date(),
         commentAnswer,
      })) as AxiosResponse<{ createdCommentAnswer: ICommentAnswers[] }>
      return response
   }

   const { mutate } = useMutation({
      mutationKey: ['saveAnswerText'],
      mutationFn: handleMutate,
      onSuccess(data) {
         commentDispatch({
            type: CommentActions.ADD_SINGLE_COMMENT_ANSWER,
            payload: data.data.createdCommentAnswer,
         })
      },
   })
   return mutate
}

export default useCreateAnswer
