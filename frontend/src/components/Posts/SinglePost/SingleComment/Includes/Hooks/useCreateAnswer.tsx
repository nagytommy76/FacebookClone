import React, { useRef, useState } from 'react'
import useAnswerCreateMutate from './useAnswerCreateMutate'

const useCreateAnswer = (commentDepth: number, parentCommentId: string | null) => {
   const reference = useRef<null | HTMLInputElement>(null)
   const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)
   const [answerText, setAnswerText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)
   const setStatesToDefault = () => {
      setAnswerText('')
      setIsSendDisabled(true)
      setIsAnswerOpen(false)
   }
   const { saveAnswerMutate } = useAnswerCreateMutate(
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

   return {
      saveAnswerMutate,
      handleChangeText,
      handleSetAnswerOpen,
      setAnswerText,
      isAnswerOpen,
      answerText,
      isSendDisabled,
      reference,
   }
}

export default useCreateAnswer
