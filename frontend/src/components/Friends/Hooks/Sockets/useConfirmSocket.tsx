import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

import { socket } from '@/src/utils/socketIo'
import type { IMakeFriendshipArgs } from './Types'

const useConfirmSocket = () => {
   const {
      friendReducer: { friendId, friend },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)
   const userId = useAppSelector((state) => state.auth.userId)

   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         const connectedFriend = args.foundFriendsModel
         if (
            connectedFriend.senderUser == userId &&
            connectedFriend.receiverUser == friendId &&
            connectedFriend.status === 'friends'
         ) {
            friendDispatch({ type: 'SET_SELECTED_CONNECTED_FRIEND', payload: connectedFriend })
            setCardButtonType('isFriend')
         }
      }
      socket.on('confirmFriendship', setButtonType)

      return () => {
         socket.off('confirmFriendship', setButtonType)
      }
   }, [setCardButtonType, friend, friendId, friendDispatch, userId])

   return null
}

export default useConfirmSocket
