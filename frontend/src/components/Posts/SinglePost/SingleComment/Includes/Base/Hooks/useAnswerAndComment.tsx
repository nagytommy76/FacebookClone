import React, { useRef, useState } from 'react'
import useEmojiText from '@/src/hooks/useEmojiText'

const useAnswerAndComment = () => {
   const reference = useRef<HTMLTextAreaElement>()
   const [isUpdate, setIsUpdate] = useState<boolean>(false)
   const [isError, setIsError] = useState<boolean>(false)
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const [text, setText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)
   const [imagePath, setImagePath] = useState<FileList | null>(null)
   const handleChangeEmoji = useEmojiText(reference, setText)
   const setStatesToDefault = () => {
      setText('')
      setIsSendDisabled(true)
      setIsOpen(false)
      setIsUpdate(false)
      setImagePath(null)
   }

   // ezt használom a válasz kinyitására és beállítom default-ra, pl ha a módosítás után nyomom meg
   const handleSetOpen = () => {
      setStatesToDefault()
      setIsOpen(true)
   }
   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setText(event.target.value)
   }

   const handleChangeTextWithEmoji = (emoji: string = '') => {
      if (text.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      handleChangeEmoji(emoji)
   }

   const handleSetOpenForUpdate = (commentText: string) => {
      setText(commentText)
      setIsOpen(true)
      setIsUpdate(true)
   }

   return {
      isSendDisabled,
      imagePath,
      reference,
      isUpdate,
      isError,
      isOpen,
      text,
      setIsError,
      setImagePath,
      handleSetOpen,
      handleChangeText,
      setStatesToDefault,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
   }
}

export default useAnswerAndComment
