import { useState, useRef } from 'react'
import useEmojiText from '@/hooks/useEmojiText'

import useTypingSocket from './Sockets/useTypingSocket'
import useSendMsgSocket from './Sockets/useSendMsgSocket'
import useDeleteSocket from './Sockets/useDeleteSocket'
// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj

const useMessage = () => {
   const chatRef = useRef<HTMLTextAreaElement>()
   const messageBoxRef = useRef<HTMLDivElement | null>(null)
   const [chatMsg, setChatMsg] = useState<string>('')
   const [typingStatus, setTypingStatus] = useState<boolean>(false)
   const handleChangeEmoji = useEmojiText(chatRef, setChatMsg)

   const handleTyping = useTypingSocket(setTypingStatus)
   useSendMsgSocket(setTypingStatus)
   useDeleteSocket()

   const handleChatMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Ide kell egy emit és a MsgBox-hoz egy on socket?!
      handleTyping(event.target.value.length)
      setChatMsg(event.target.value)
   }

   const handleChangeTextWithEmoji = (emoji: string = '') => {
      handleTyping(emoji.length)
      handleChangeEmoji(emoji)
   }

   const restoreTextField = () => {
      handleChangeTextWithEmoji()
      setChatMsg('')
   }

   return {
      chatRef,
      messageBoxRef,
      chatMsg,
      typingStatus,
      handleChangeTextWithEmoji,
      handleChatMsg,
      restoreTextField,
   }
}

export default useMessage
