import { useEffect, useCallback, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'

const useFriendWithdraw = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: {
         friend: { friends },
      },
      setCardButtonType,
   } = useContext(FriendContext)
   // Ebben az esetben én küldtem egy felkérést ( a belépett user ) és vissza tudom hívni

   const setCardTypeToWithdraw = useCallback(() => {
      const mySentFriendRequests = friends.find(
         (friend) => friend.friend == userId && friend.status === 'pending' && !friend.isSender
      )

      if (mySentFriendRequests) setCardButtonType('withdrawRequest')
   }, [setCardButtonType, friends, userId])

   useEffect(() => {
      setCardTypeToWithdraw()
   }, [setCardTypeToWithdraw])

   return setCardTypeToWithdraw
}

export default useFriendWithdraw
