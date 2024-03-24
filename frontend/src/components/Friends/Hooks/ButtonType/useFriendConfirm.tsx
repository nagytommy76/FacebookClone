import { useEffect, useCallback, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

import useFriendSocket from '../Sockets/useFriendSocket'

const useFriendConfirm = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: {
         friendId,
         friend: { connectedFriends },
      },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)

   const setButtonTypeToConfirmFriend = useCallback(
      (/*friends: IFriends[], friendId: string*/) => {
         // Ebben az esetben megtaláltam a nekem ( belépett user ) küldött requesteket
         const myFriendRequest = connectedFriends.find(
            (friend) =>
               friend.receiverUser == userId && friend.senderUser === friendId && friend.status === 'pending'
         )
         if (myFriendRequest) {
            friendDispatch({ type: 'SET_CONNECTED_FRIEND', payload: myFriendRequest })
            setCardButtonType('confirmFriend')
         }
         return myFriendRequest
      },
      [setCardButtonType, friendDispatch, userId, connectedFriends, friendId]
   )
   useFriendSocket(friendId, setButtonTypeToConfirmFriend)

   useEffect(() => {
      setButtonTypeToConfirmFriend()
   }, [setButtonTypeToConfirmFriend, friendId])

   return setButtonTypeToConfirmFriend
}

export default useFriendConfirm
