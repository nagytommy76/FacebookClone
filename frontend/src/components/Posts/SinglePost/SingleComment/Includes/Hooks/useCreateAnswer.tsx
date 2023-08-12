import React, { useRef, useState } from 'react'
import useAnswerCreateMutate from './useAnswerCreateMutate'
import useUpdateCommentMutate from './useUpdateCommentMutate'

const useCreateAnswer = (commentDepth: number, parentCommentId: string | null) => {
   const reference = useRef<null | HTMLInputElement>(null)
   const [isUpdate, setIsUpdate] = useState<boolean>(false)
   const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)
   const [answerText, setAnswerText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)
   const setStatesToDefault = () => {
      setAnswerText('')
      setIsSendDisabled(true)
      setIsAnswerOpen(false)
      setIsUpdate(false)
   }

   const updateCommentMutate = useUpdateCommentMutate(answerText, setStatesToDefault)
   const saveAnswerMutate = useAnswerCreateMutate(
      commentDepth,
      parentCommentId,
      answerText,
      setStatesToDefault
   )

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

   const handleSetAnswerOpenForUpdate = (commentText: string) => {
      setAnswerText(commentText)
      handleSetAnswerOpen()
      setIsUpdate(true)
   }

   return {
      handleSetAnswerOpenForUpdate,
      saveAnswerMutate,
      updateCommentMutate,
      handleChangeText,
      handleSetAnswerOpen,
      isAnswerOpen,
      answerText,
      isSendDisabled,
      isUpdate,
      reference,
   }
}

export default useCreateAnswer
