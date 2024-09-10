import dynamic from 'next/dynamic'
import useGetAccepted from './Hooks/useGetAccepted'
import useChatModal from '../../../hooks/useChatModal'
import { useAppSelector } from '@/reduxStore/store'

import { AcceptedFriendsStyles, FriendMenuItemStyle, FriendNameStyle } from './styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const AcceptedFriends = () => {
   const hadleOpenMutateChatModal = useChatModal()
   const myFriends = useGetAccepted()
   const isOnlineFriends = useAppSelector((state) => state.chat.isOnlineFriends)

   return (
      <AcceptedFriendsStyles>
         <Typography sx={{ mb: 5 }} variant='h5'>
            Ismerősök
         </Typography>
         {myFriends.map((friend) => (
            <FriendMenuItemStyle
               onClick={() =>
                  hadleOpenMutateChatModal({
                     userId: friend._id,
                  })
               }
               key={friend._id}
            >
               <ChatAvatar
                  fullName={`${friend.firstName} ${friend.sureName}`}
                  selectedProfilePicturePath={friend.selectedProfilePicture[0].path}
                  isRead={
                     isOnlineFriends !== null && isOnlineFriends[friend._id] !== undefined
                        ? !isOnlineFriends[friend._id].isActive
                        : true
                  }
               />
               <FriendNameStyle variant='body1'>{`${friend.firstName} ${friend.sureName}`}</FriendNameStyle>
            </FriendMenuItemStyle>
         ))}
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
