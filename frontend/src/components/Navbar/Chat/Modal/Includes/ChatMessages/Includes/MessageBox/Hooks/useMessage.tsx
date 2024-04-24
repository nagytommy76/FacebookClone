import { useState, useRef } from 'react'
import useEmojiText from '@/hooks/useEmojiText'

const useMessage = () => {
   const chatRef = useRef()
   const [chatMsg, setChatMsg] = useState<string>('')
   const [chatImagePath, setChatImagePath] = useState<FileList | null>(null)
   const handleChangeEmoji = useEmojiText(chatRef, setChatMsg)

   const handleChatMsg = (event: React.ChangeEvent<HTMLInputElement>) => setChatMsg(event.target.value)
   const handleChangeTextWithEmoji = (emoji: string = '') => {
      handleChangeEmoji(emoji)
   }

   const restoreTextField = () => {
      handleChangeTextWithEmoji()
      setChatMsg('')
      setChatImagePath(null)
   }

   return {
      chatRef,
      chatMsg,
      chatImagePath,
      handleChangeTextWithEmoji,
      setChatImagePath,
      handleChatMsg,
      restoreTextField,
   }
}

export default useMessage
