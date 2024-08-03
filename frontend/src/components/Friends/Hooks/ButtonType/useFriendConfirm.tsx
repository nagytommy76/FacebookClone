import { useEffect, useCallback, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

import useFriendSocket from '../Sockets/useFriendSocket'

const useFriendConfirm = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: {
         friendId,
         friend: { friends },
      },
      setCardButtonType,
   } = useContext(FriendContext)
   useFriendSocket()

   const setButtonTypeToConfirmFriend = useCallback(() => {
      // Ebben az esetben megtaláltam a nekem ( belépett user ) küldött requesteket
      const mySentFriendRequests = friends.find(
         (friend) => friend.friend == userId && friend.status === 'pending' && !friend.isSender
      )

      if (mySentFriendRequests) setCardButtonType('confirmFriend')
   }, [setCardButtonType, friends, userId])

   useEffect(() => {
      setButtonTypeToConfirmFriend()
   }, [setButtonTypeToConfirmFriend, friendId])

   return setButtonTypeToConfirmFriend
}

export default useFriendConfirm
