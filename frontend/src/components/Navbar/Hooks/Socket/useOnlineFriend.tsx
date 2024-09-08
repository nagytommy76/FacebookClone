import { useEffect } from 'react'
import { useAppDispatch } from '@/reduxStore/store'
import { setOnlineStatus } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'
import type { IRawOnlineFriends } from '@/types/FriendTypes'

const useOnlineFriend = () => {
   // This hook checks if a friend opens the app and if he is online
   const dispatch = useAppDispatch()

   useEffect(() => {
      socket.on('online:friend', (args: IRawOnlineFriends) => {
         console.log('OnLINE FRIENDS', args)
         dispatch(
            setOnlineStatus({
               userId: args.userId,
               isActive: args.isActive == '1' ? true : false,
               lastSeen: Number(args.lastSeen),
            })
         )
      })

      socket.on('offline:friend', (args: { userId: string }) => {
         console.log('OFFLINE FRIENDS', args)
         dispatch(setOnlineStatus({ userId: args.userId, isActive: false, lastSeen: 0 }))
      })
      return () => {
         socket.off('online:friends')
         socket.off('offline:friends')
      }
   }, [dispatch])
   return null
}

export default useOnlineFriend
