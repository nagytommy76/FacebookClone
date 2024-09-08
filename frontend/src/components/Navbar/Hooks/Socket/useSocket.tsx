import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { socket } from '@/src/utils/socketIo'

const useSocket = () => {
   const dispatch = useAppDispatch()
   const userId = useAppSelector((state) => state.auth.userId)
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      if (isLoggedIn) {
         socket.connect()
         socket.on('connect', () => {})
      }
      return () => {
         socket.on('disconnect', () => {})
      }
   }, [userId, isLoggedIn, dispatch])
   return null
}

export default useSocket
