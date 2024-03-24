import { useEffect, useCallback, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

const useFriendWithdraw = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: {
         friend: { connectedFriends },
      },
      setCardButtonType,
   } = useContext(FriendContext)
   // Ebben az esetben én küldtem egy felkérést ( a belépett user ) és vissza tudom hívni

   const setCardTypeToWithdraw = useCallback(
      (/*connectedFriends: IConnectedFriends[]*/) => {
         const mySentFriendRequests = connectedFriends.find(
            (item) => item.senderUser == userId && item.status === 'pending'
         )
         if (mySentFriendRequests) {
            setCardButtonType('withdrawRequest')
         }
         return mySentFriendRequests
      },
      [setCardButtonType, userId, connectedFriends]
   )

   useEffect(() => {
      setCardTypeToWithdraw()
   }, [setCardTypeToWithdraw])

   return setCardTypeToWithdraw
}

export default useFriendWithdraw
