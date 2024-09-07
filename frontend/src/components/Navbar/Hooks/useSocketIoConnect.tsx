import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setOnlineStatus } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

export interface IOnlineFriendsRedis {
   [x: string]: {
      userId: string
      socketId: string
      isActive: number
      lastSeen: number
   }
}

const useSocketIoConnect = () => {
   const dispatch = useAppDispatch()
   const userId = useAppSelector((state) => state.auth.userId)
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const isOnlineFriends = useAppSelector((state) => state.chat.isOnlineFriends)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      if (isLoggedIn) {
         socket.connect()
         socket.on('connect', () => {})

         socket.on('online:friends', (args: { userId: string; socketId: string }) => {
            // console.log('OnLINE FRIENDS', args)
            dispatch(setOnlineStatus({ friendId: args.userId, status: true }))
         })

         socket.on('offline:friends', (args: { userId: string }) => {
            // console.log('OFFLINE FRIENDS', args)
            dispatch(setOnlineStatus({ friendId: args.userId, status: false }))
         })
      }
      return () => {
         socket.on('disconnect', () => {})
      }
   }, [userId, isLoggedIn, dispatch])

   useEffect(() => {
      if (userId !== null || userId !== '') {
         socket.emit('newUser', userId)
      }
   }, [userId])

   // Check online friends on login
   useEffect(() => {
      if (isOnlineFriends)
         socket.emit('friend:checkOnlineFriends', { friendIds: Object.keys(isOnlineFriends) })
   }, [userId, isOnlineFriends])

   useEffect(() => {
      socket.on(
         'friend:checkOnlineFriendsResponse',
         (onlineFriends: { [key: string]: IOnlineFriendsRedis }) => {
            console.log('friend:checkOnlineFriendsResponse: ', onlineFriends)
         }
      )
   }, [])

   useEffect(() => {
      if (messageLabels) {
         const labels = Object.keys(messageLabels)
         socket.emit('join_room', { chatRoomId: labels })
      }
   }, [messageLabels])

   return null
}

export default useSocketIoConnect
