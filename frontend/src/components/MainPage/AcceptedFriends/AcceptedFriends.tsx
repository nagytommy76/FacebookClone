import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'

import useGetAccepted from './Hooks/useGetAccepted'
import useChatModal from '../../../hooks/useChatModal'

import { AcceptedFriendsStyles, FriendMenuItemStyle, FriendNameStyle } from './styles'
import Typography from '@mui/material/Typography'

import TooltipWrapper from './TooltipWrapper'
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
            <TooltipWrapper
               lastSeen={(isOnlineFriends && isOnlineFriends[friend._id]?.lastSeen) || 0}
               key={friend._id}
            >
               <FriendMenuItemStyle
                  onClick={() =>
                     hadleOpenMutateChatModal({
                        userId: friend._id,
                     })
                  }
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
            </TooltipWrapper>
         ))}
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
