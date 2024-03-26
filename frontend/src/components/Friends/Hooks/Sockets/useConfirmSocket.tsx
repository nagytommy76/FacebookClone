import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

import { socket } from '@/src/utils/socketIo'
import type { IConnectedFriends } from '../../Types'
import type { IMakeFriendshipArgs } from './Types'

const useConfirmSocket = (setBtnTypeDeleteFriendSender: (connectedFriend: IConnectedFriends) => void) => {
   const {
      friendReducer: { selectedConnectedFriend },
      setCardButtonType,
   } = useContext(FriendContext)
   const userId = useAppSelector((state) => state.auth.userId)

   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         setBtnTypeDeleteFriendSender(args.foundFriendsModel)
         const connectedFriend = args.foundFriendsModel

         // Át kéne tenni ide, nem a useFriendDelete hookban
         if (
            connectedFriend.senderUser == userId ||
            (connectedFriend.receiverUser && connectedFriend.status === 'friends')
         ) {
            setCardButtonType('isFriend')
         }

         setCardButtonType('isFriend')
         console.log(args)
      }
      socket.on('confirmFriendship', setButtonType)

      return () => {
         socket.off('confirmFriendship', setButtonType)
      }
   }, [setBtnTypeDeleteFriendSender, setCardButtonType])

   return null
}

export default useConfirmSocket
