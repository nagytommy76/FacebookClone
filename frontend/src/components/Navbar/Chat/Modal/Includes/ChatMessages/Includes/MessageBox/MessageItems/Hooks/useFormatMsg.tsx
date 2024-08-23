import { useState, useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import { selectMessagesByChatId } from '@/reduxStore/slices/ChatSlice'

import useFormatMessageDate from './useFormatMessageDate'
import type { IMessages } from '@/src/components/Navbar/Chat/Types'

const useFormatMsg = () => {
   const messages = useAppSelector(selectMessagesByChatId)
   const [allMessages, setAllMessages] = useState<{ [key: string]: IMessages[] } | null>(null)
   const groupMessagesByInterval = useFormatMessageDate()

   useEffect(() => {
      if (messages) {
         const grouppedMessagedByDate = groupMessagesByInterval(messages, 'hour')
         setAllMessages(grouppedMessagedByDate)
         console.log(grouppedMessagedByDate)
      }
   }, [messages])

   return allMessages
}

export default useFormatMsg
