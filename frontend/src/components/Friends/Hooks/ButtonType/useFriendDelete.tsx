import { useCallback, useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'
import type { IConnectedFriends } from '../../Types'

const useFriendDelete = () => {
   const {
      friendReducer: {
         friendId,
         friend: { connectedFriends },
      },
      setCardButtonType,
   } = useContext(FriendContext)
   const userId = useAppSelector((state) => state.auth.userId)

   // Ebben az esetben a belépett user visszaigazolás gombját állítom át barát törlése gombra
   const setBtnTypeToDeleteFriend = useCallback(
      (connectedFriend: IConnectedFriends) => {
         if (connectedFriend.receiverUser === userId && connectedFriend.status === 'friends') {
            setCardButtonType('isFriend')
         }
      },
      [userId, setCardButtonType]
   )

   // Logged in receiver Abban az esetben ha a küldő barát van belépve
   const setBtnTypeToDeleteReceiver = useCallback(
      (connectedFriend: IConnectedFriends[]) => {
         if (
            connectedFriend.find(
               (friend) =>
                  friend.receiverUser === userId &&
                  friend.senderUser === friendId &&
                  friend.status === 'friends'
            )
         ) {
            setCardButtonType('isFriend')
         }
      },
      [userId, friendId, setCardButtonType]
   )
   // Logged in receiver. Abban az esetben ha a fogadó barát van belépve
   const setBtnTypeToDeleteSender = useCallback(
      (connectedFriend: IConnectedFriends[]) => {
         if (
            connectedFriend.find(
               (friend) =>
                  friend.senderUser === userId &&
                  friend.receiverUser === friendId &&
                  friend.status === 'friends'
            )
         ) {
            setCardButtonType('isFriend')
         }
      },
      [userId, friendId, setCardButtonType]
   )

   useEffect(() => {}, [])

   useEffect(() => {
      if (connectedFriends) {
         setBtnTypeToDeleteReceiver(connectedFriends)
         setBtnTypeToDeleteSender(connectedFriends)
      }
   }, [connectedFriends, setBtnTypeToDeleteSender, setBtnTypeToDeleteReceiver])

   return { setBtnTypeToDeleteFriend }
}

export default useFriendDelete
