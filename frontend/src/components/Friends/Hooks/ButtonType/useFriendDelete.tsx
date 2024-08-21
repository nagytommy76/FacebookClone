import { useCallback, useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'
import useRejectSocket from '../Sockets/useRejectSocket'

const useFriendDelete = () => {
   useRejectSocket()
   const {
      friendReducer: {
         friend: { friends },
      },
      setCardButtonType,
   } = useContext(FriendContext)
   const userId = useAppSelector((state) => state.auth.userId)

   // Ebben az esetben a belépett user visszaigazolás gombját állítom át barát törlése gombra
   // Itt a küldőnél állítom át -> barát törlése gombra
   const setBtnTypeToDeleteFriend = useCallback(() => {
      const foundReceiver = friends.find(
         (friend) =>
            friend.friend === userId && friend.status === 'friends' && (friend.isSender || !friend.isSender)
      )
      if (foundReceiver) setCardButtonType('isFriend')
   }, [userId, setCardButtonType, friends])

   useEffect(() => {
      setBtnTypeToDeleteFriend()
   }, [setBtnTypeToDeleteFriend])

   return null
}

export default useFriendDelete
