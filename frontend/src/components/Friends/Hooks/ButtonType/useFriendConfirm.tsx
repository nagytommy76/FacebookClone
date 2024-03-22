import { useEffect, useCallback } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IConnectedFriends } from '../../Types'

import useFriendSocket from '../Sockets/useFriendSocket'

const useFriendConfirm = (
   friendId: string,
   connectedFriends: IConnectedFriends[],
   setCardButtonType: (value: React.SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const setButtonTypeToConfirmFriend = useCallback(
      (/*friends: IFriends[], friendId: string*/) => {
         // Ebben az esetben megtaláltam a nekem ( belépett user ) küldött requesteket
         const myFriendRequest = connectedFriends.find((friend) => friend.receiverUser == userId)
         if (myFriendRequest) {
            setCardButtonType('confirmFriend')
         }
         return myFriendRequest
      },
      [setCardButtonType, userId, connectedFriends]
   )
   useFriendSocket(friendId, setButtonTypeToConfirmFriend)

   useEffect(() => {
      setButtonTypeToConfirmFriend()
   }, [setButtonTypeToConfirmFriend, friendId])

   return setButtonTypeToConfirmFriend
}

export default useFriendConfirm
