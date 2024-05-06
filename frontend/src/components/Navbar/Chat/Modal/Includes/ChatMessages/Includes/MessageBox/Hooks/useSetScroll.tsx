import { MutableRefObject, useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'

const useSetScroll = (messageBoxRef: MutableRefObject<HTMLDivElement | null>) => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   useEffect(() => {
      // Itt kéne egy requestet küldeni, hogy átállítson minden üzit isRead -> true-ra
      const element = messageBoxRef.current
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' })
         element.scrollTop = element.scrollHeight
      }
   }, [messageBoxRef, messageLabels])

   return null
}

export default useSetScroll
