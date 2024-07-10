import { Dispatch, SetStateAction, useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'

const useEndTypingSocket = (setTypingStatus: Dispatch<SetStateAction<boolean>>) => {
   useEffect(() => {
      const endTypingStatus = () => {
         setTypingStatus(false)
      }
      socket.on('chat:endTypingResponse', endTypingStatus)

      return () => {
         socket.off('chat:endTypingResponse', endTypingStatus)
      }
   }, [setTypingStatus])

   return null
}

export default useEndTypingSocket
