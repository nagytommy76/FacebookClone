import { useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'

import type { FriendButtonType, IFriends } from '../Types'

const useFriendWithdraw = (
   friends: IFriends[],
   setCardButtonType: (value: React.SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const mySentFriendRequests = friends.find((item) => item.userId === userId && !item.isSender)
   // Ebben az esetben én küldtem egy felkérést ( a belépett user ) és vissza tudom hívni
   useEffect(() => {
      if (mySentFriendRequests) {
         console.log(mySentFriendRequests)
         if (mySentFriendRequests.isAccepted === false) {
            setCardButtonType('withdrawRequest')
         }
      }
   }, [mySentFriendRequests, setCardButtonType])

   return null
}

export default useFriendWithdraw
