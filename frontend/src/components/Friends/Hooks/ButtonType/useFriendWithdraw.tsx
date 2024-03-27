import { useEffect, useCallback, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'
import type { IConnectedFriends } from '../../Types'

const useFriendWithdraw = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: {
         friend: { connectedFriends },
      },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)
   // Ebben az esetben én küldtem egy felkérést ( a belépett user ) és vissza tudom hívni

   const setCardTypeToWithdraw = useCallback(
      (connectedFriends: IConnectedFriends[]) => {
         const mySentFriendRequests = connectedFriends.find(
            (item) => item.senderUser == userId && item.status === 'pending'
         )
         if (mySentFriendRequests) {
            friendDispatch({ type: 'SET_SELECTED_CONNECTED_FRIEND', payload: mySentFriendRequests })
            setCardButtonType('withdrawRequest')
         }
         return mySentFriendRequests
      },
      [setCardButtonType, friendDispatch, userId]
   )

   useEffect(() => {
      setCardTypeToWithdraw(connectedFriends)
   }, [setCardTypeToWithdraw, connectedFriends])

   return setCardTypeToWithdraw
}

export default useFriendWithdraw
