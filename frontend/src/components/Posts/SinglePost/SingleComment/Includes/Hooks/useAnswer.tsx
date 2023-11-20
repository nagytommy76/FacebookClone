import React, { useRef, useState } from 'react'
import useAnswerCreateMutate from './useAnswerCreateMutate'
import useUpdateCommentMutate from './useUpdateCommentMutate'
import useUpdateAnswer from './useUpdateAnswer'
import useEmojiText from '@/src/hooks/useEmojiText'

const useAnswer = (commentDepth: number, parentCommentId: string | null) => {
   const reference = useRef<HTMLTextAreaElement>()
   const [isUpdate, setIsUpdate] = useState<boolean>(false)
   const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)
   const [answerText, setAnswerText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)
   const [commentImagePath, setCommentImagePath] = useState<FileList | null>(null)
   const handleChangeEmoji = useEmojiText(reference, setAnswerText)
   const setStatesToDefault = () => {
      setAnswerText('')
      setIsSendDisabled(true)
      setIsAnswerOpen(false)
      setIsUpdate(false)
   }

   const updateCommentMutate = useUpdateCommentMutate(answerText, setStatesToDefault)
   const updateCommentAnswerMutate = useUpdateAnswer(answerText, setStatesToDefault)
   const saveAnswerMutate = useAnswerCreateMutate(
      commentImagePath,
      commentDepth,
      parentCommentId,
      answerText,
      setStatesToDefault
   )

   const handleSetAnswerOpen = () => {
      setIsAnswerOpen(true)
   }
   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setAnswerText(event.target.value)
   }

   const handleChangeTextWithEmoji = (emoji: string = '') => {
      if (answerText.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      handleChangeEmoji(emoji)
   }

   const handleSetAnswerOpenForUpdate = (commentText: string) => {
      setAnswerText(commentText)
      handleSetAnswerOpen()
      setIsUpdate(true)
   }

   const handleUpdateCommentAnswerMutate = (answerId: string) => {
      updateCommentAnswerMutate(answerId)
      setIsUpdate(true)
   }

   return {
      handleSetAnswerOpenForUpdate,
      saveAnswerMutate,
      updateCommentMutate,
      handleUpdateCommentAnswerMutate,
      handleChangeText,
      handleChangeTextWithEmoji,
      handleSetAnswerOpen,
      setCommentImagePath,
      commentImagePath,
      isAnswerOpen,
      answerText,
      isSendDisabled,
      isUpdate,
      reference,
   }
}

export default useAnswer
