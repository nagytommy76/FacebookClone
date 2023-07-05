import React, { useContext, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import { CommentContext } from '../../Context/CommentContext'
import { CommentActions } from '../../Context/CommentReducer'
import { ICommentAnswers } from '@/src/types/LikeTypes'

const useCreateAnswer = (commentDepth: number, parentCommentId: string | null) => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)
   const reference = useRef<null | HTMLInputElement>(null)
   const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)
   const [answerText, setAnswerText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)

   const handleSetAnswerOpen = () => {
      setIsAnswerOpen(true)
      // Azért kell, hogy miután kinyílik a collapse, az után állítsa be.
      setTimeout(() => {
         if (reference) reference.current?.focus()
      }, 200)
   }
   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setAnswerText(event.target.value)
   }

   const handleMutate = async () => {
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

   const { mutate } = useMutation({
      mutationKey: ['saveAnswerText'],
      mutationFn: handleMutate,
      onSuccess(data) {
         commentDispatch({
            type: CommentActions.ADD_SINGLE_COMMENT_ANSWER,
            payload: data.data.createdCommentAnswer,
         })
         setAnswerText('')
         setIsSendDisabled(true)
         setIsAnswerOpen(false)
      },
   })
   return {
      answerMutate: mutate,
      handleChangeText,
      handleSetAnswerOpen,
      isAnswerOpen,
      answerText,
      isSendDisabled,
      reference,
   }
}

export default useCreateAnswer
