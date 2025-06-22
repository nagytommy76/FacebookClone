'use client'

import FriendsComponent from '@/components/Friends/Friends'
import useGetMyFriends from './useGetMyFriends'

export default function Friends() {
   const friends = useGetMyFriends()

   return <FriendsComponent friends={friends || []} />
}
