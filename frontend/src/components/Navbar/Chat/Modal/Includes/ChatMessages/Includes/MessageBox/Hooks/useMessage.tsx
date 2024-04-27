import { useState, useRef } from 'react'
import useEmojiText from '@/hooks/useEmojiText'
// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj
const useMessage = () => {
   const chatRef = useRef<HTMLTextAreaElement>()
   const messageBoxRef = useRef<HTMLDivElement | null>(null)
   const [chatMsg, setChatMsg] = useState<string>('')
   const [chatImagePath, setChatImagePath] = useState<FileList | null>(null)
   const [typingStatus, setTypingStatus] = useState<boolean>(false)
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
      messageBoxRef,
      chatMsg,
      chatImagePath,
      handleChangeTextWithEmoji,
      setChatImagePath,
      handleChatMsg,
      restoreTextField,
   }
}

export default useMessage
