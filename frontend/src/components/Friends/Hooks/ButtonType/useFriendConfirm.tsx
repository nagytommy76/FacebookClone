import { useEffect, useCallback } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IFriends } from '../../Types'

import useFriendSocket from '../Sockets/useFriendSocket'

const useFriendConfirm = (
   friendId: string,
   friends: IFriends[],
   setCardButtonType: (value: React.SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const setButtonTypeToConfirmFriend = useCallback(
      (friends: IFriends[], friendId: string) => {
         // Ebben az esetben megtaláltam a nekem ( belépett user ) küldött requesteket
         const myFriendRequest = friends.find(
            (item) => item.senderUserId === friendId && item.receiverUserId === userId
         )
         if (myFriendRequest) {
            setCardButtonType('confirmFriend')
         }
      },
      [setCardButtonType, userId]
   )
   useFriendSocket(friendId, setButtonTypeToConfirmFriend)

   useEffect(() => {
      setButtonTypeToConfirmFriend(friends, friendId)
   }, [setButtonTypeToConfirmFriend, friends, friendId])

   return setButtonTypeToConfirmFriend
}

export default useFriendConfirm
