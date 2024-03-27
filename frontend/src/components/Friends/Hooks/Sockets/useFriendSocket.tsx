import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { socket } from '@/src/utils/socketIo'
import { useAppSelector } from '@/reduxStore/store'
import type { IConnectedFriends } from '../../Types'
import type { NotificationType } from '../../../Navbar/Includes/Notification/Types'

interface IMakeFriendshipArgs {
   notifications: NotificationType
   userFriends: string[]
   createdConnectedFriends: IConnectedFriends
}

const useFriendSocket = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: { friendId },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)

   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         if (
            args.createdConnectedFriends.receiverUser == userId &&
            args.createdConnectedFriends.senderUser === friendId &&
            args.createdConnectedFriends.status === 'pending'
         ) {
            friendDispatch({
               type: 'SET_SELECTED_CONNECTED_FRIEND',
               payload: args.createdConnectedFriends,
            })
            setCardButtonType('confirmFriend')
         }
      }

      socket.on('makeFriendship', setButtonType)
      return () => {
         socket.off('makeFriendship', setButtonType)
      }
   }, [friendDispatch, setCardButtonType, userId, friendId])

   return null
}

export default useFriendSocket
