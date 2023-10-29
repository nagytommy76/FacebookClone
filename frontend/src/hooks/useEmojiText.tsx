import React, { MutableRefObject } from 'react'

const useEmojiText = (
   textAreaRef: MutableRefObject<HTMLTextAreaElement | HTMLInputElement | undefined>,
   setPostOrComment: (value: React.SetStateAction<string>) => void
) => {
   const changeTextWithEmoji = (emoji: string = '') => {
      if (textAreaRef.current) {
         const textArea = textAreaRef.current
         const currentText = textArea.value
         const cursorPosition = textArea.selectionEnd as number
         const startText = currentText.substring(0, textArea.selectionStart as number)
         const endText = currentText.substring(textArea.selectionStart as number)
         const textWithEmoji = `${startText}${emoji}${endText}`
         setPostOrComment(textWithEmoji)
         textArea.focus()
         setTimeout(() => {
            textArea.selectionEnd = cursorPosition + emoji.length
         }, 50)
      }
   }
   return changeTextWithEmoji
}

export default useEmojiText
