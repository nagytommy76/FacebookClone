import { useMemo } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import { selectMessagesByChatId } from '@/reduxStore/slices/ChatSlice'

import useFormatMessageDate from './useFormatMessageDate'

const useFormatMsg = () => {
   const messages = useAppSelector(selectMessagesByChatId)
   const groupMessagesByInterval = useFormatMessageDate()

   const allMessages = useMemo(
      () => groupMessagesByInterval(messages, 'hour'),
      [messages, groupMessagesByInterval]
   )

   return allMessages
}

export default useFormatMsg
