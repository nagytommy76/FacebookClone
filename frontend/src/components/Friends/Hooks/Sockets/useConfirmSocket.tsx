import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

import { socket } from '@/src/utils/socketIo'
import type { IMakeFriendshipArgs } from './Types'

const useConfirmSocket = () => {
   const {
      friendReducer: { friendId },
      friendDispatch,
   } = useContext(FriendContext)
   const userId = useAppSelector((state) => state.auth.userId)

   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         friendDispatch({
            type: 'SET_SENDER_FRIENDS',
            payload: { receiverFriendId: args.userFriends.friend, receiverFriends: args.userFriends },
         })
      }
      socket.on('confirmFriendship', setButtonType)

      return () => {
         socket.off('confirmFriendship', setButtonType)
      }
   }, [friendDispatch, friendId, userId])

   return null
}

export default useConfirmSocket
