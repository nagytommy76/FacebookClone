import { useEffect } from 'react'
import { useAppDispatch } from '@/reduxStore/store'
import { setOnlineStatus, setOnlineFriends } from '@/reduxStore/slices/ChatSlice'
import { setHeadText, setImageSrc, setIsInfoSnackOpen } from '@/reduxStore/slices/InfoSnack'
import { socket } from '@/src/utils/socketIo'
import type { IRawOnlineFriends } from '@/types/FriendTypes'

const useOnlineFriend = () => {
   // This hook checks if a friend opens the app or loggs in -> is online
   const dispatch = useAppDispatch()

   useEffect(() => {
      socket.on(
         'online:friend',
         (args: { onlineUserData: IRawOnlineFriends; userName: string; profilePicture: string }) => {
            const { onlineUserData, userName, profilePicture } = args
            dispatch(
               setOnlineFriends({
                  userId: onlineUserData.userId,
                  isActive: onlineUserData.isActive == '1' ? true : false,
                  lastSeen: Number(onlineUserData.lastSeen),
               })
            )
            dispatch(setIsInfoSnackOpen(onlineUserData.isActive == '1' ? true : false))
            dispatch(setImageSrc(profilePicture))
            dispatch(setHeadText(`${userName} elérhető!`))
            dispatch(setHeadText(`${userName} újra elérhető!`))
         }
      )

      socket.on('offline:friend', (args: { userId: string }) => {
         dispatch(setOnlineStatus({ userId: args.userId, isActive: false }))
      })
      return () => {
         socket.off('online:friends')
         socket.off('offline:friends')
      }
   }, [dispatch])
   return null
}

export default useOnlineFriend
