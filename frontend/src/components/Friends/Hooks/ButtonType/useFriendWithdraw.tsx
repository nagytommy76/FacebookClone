import { useEffect, useCallback, SetStateAction } from 'react'
import { useAppSelector } from '@/reduxStore/store'

import type { FriendButtonType, IFriends } from '../../Types'

const useFriendWithdraw = (
   friends: IFriends[],
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)
   // Ebben az esetben én küldtem egy felkérést ( a belépett user ) és vissza tudom hívni

   const setCardTypeToWithdraw = useCallback(
      (friends: IFriends[]) => {
         const mySentFriendRequests = friends.find((item) => item.senderUserId === userId && !item.isSender)
         if (mySentFriendRequests) {
            if (mySentFriendRequests.isAccepted === false) {
               setCardButtonType('withdrawRequest')
            }
         }
         return mySentFriendRequests
      },
      [setCardButtonType, userId]
   )

   useEffect(() => {
      setCardTypeToWithdraw(friends)
   }, [setCardTypeToWithdraw, friends])

   return setCardTypeToWithdraw
}

export default useFriendWithdraw
