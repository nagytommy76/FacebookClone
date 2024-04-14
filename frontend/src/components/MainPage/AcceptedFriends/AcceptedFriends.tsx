import dynamic from 'next/dynamic'
import useGetAccepted from './Hooks/useGetAccepted'
import useChatModal from './Hooks/useChatModal'

import { AcceptedFriendsStyles, FriendMenuItemStyle } from './styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const AcceptedFriends = () => {
   const hadleOpenMutateChatModal = useChatModal()
   const myFriends = useGetAccepted()

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
                     fullName: `${friend.firstName} ${friend.sureName}`,
                     selectedProfilePicturePath: friend.selectedProfilePicture[0].path,
                  })
               }
               key={friend._id}
            >
               <ChatAvatar
                  fullName={`${friend.firstName} ${friend.sureName}`}
                  selectedProfilePicturePath={friend.selectedProfilePicture[0].path}
               />
               <Typography variant='body1'>{`${friend.firstName} ${friend.sureName}`}</Typography>
            </FriendMenuItemStyle>
         ))}
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
