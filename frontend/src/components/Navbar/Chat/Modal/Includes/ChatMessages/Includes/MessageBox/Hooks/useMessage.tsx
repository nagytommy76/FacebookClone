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

   return { chatRef, chatMsg, chatImagePath, handleChangeTextWithEmoji, setChatImagePath, handleChatMsg }
}

export default useMessage
