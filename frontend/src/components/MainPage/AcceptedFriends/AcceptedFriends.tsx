import dynamic from 'next/dynamic'
import useGetAccepted from './Hooks/useGetAccepted'
import useChatModal from '../../../hooks/useChatModal'
import { useAppSelector } from '@/reduxStore/store'
import moment from 'moment'

import { AcceptedFriendsStyles, FriendMenuItemStyle, FriendNameStyle } from './styles'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

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
            <Tooltip
               placement='left'
               title={isOnlineFriends && moment(isOnlineFriends[friend._id]?.lastSeen).fromNow()}
               key={friend._id}
            >
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
            </Tooltip>
         ))}
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
