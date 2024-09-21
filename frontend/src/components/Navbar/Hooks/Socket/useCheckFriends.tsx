import { useEffect } from 'react'
import { useAppDispatch } from '@/reduxStore/store'
import { setOnlineStatus } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

const useCheckFriends = () => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      // Runs when user disconnects -> closes the broser window
      socket.on('offline:friend', (args: { userId: string }) => {
         dispatch(setOnlineStatus({ userId: args.userId, isActive: false, lastSeen: Date.now() }))
      })
      return () => {
         socket.off('offline:friends')
      }
   }, [dispatch])

   return null
}

export default useCheckFriends
