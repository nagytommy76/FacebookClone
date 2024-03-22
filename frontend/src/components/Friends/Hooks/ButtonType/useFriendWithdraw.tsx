import { useEffect, useCallback, SetStateAction } from 'react'
import { useAppSelector } from '@/reduxStore/store'

import type { FriendButtonType, IConnectedFriends } from '../../Types'

const useFriendWithdraw = (
   connectedFriends: IConnectedFriends[],
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)
   // Ebben az esetben én küldtem egy felkérést ( a belépett user ) és vissza tudom hívni

   const setCardTypeToWithdraw = useCallback(
      (/*connectedFriends: IConnectedFriends[]*/) => {
         console.log(connectedFriends)
         const mySentFriendRequests = connectedFriends.find((item) => item.senderUser == userId)
         console.log(mySentFriendRequests)
         if (mySentFriendRequests) {
            if (mySentFriendRequests.status === 'pending') {
               setCardButtonType('withdrawRequest')
            }
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
