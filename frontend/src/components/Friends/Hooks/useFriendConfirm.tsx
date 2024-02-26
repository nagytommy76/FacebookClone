import { useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IFriends } from '../Types'

const useFriendConfirm = (
   friends: IFriends[],
   setCardButtonType: (value: React.SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   // Ebben az esetben megtaláltam a nekem ( belépett user ) küldött requesteket
   const myFriendRequest = friends.find((item) => item.userId === userId && item.isSender === true)

   useEffect(() => {
      if (myFriendRequest) {
         if (myFriendRequest.isSender) {
            setCardButtonType('confirmFriend')
         }
      }
   }, [myFriendRequest, setCardButtonType])

   return null
}

export default useFriendConfirm
