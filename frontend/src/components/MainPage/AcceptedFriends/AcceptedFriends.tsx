import dynamic from 'next/dynamic'
import useGetAccepted from './Hooks/useGetAccepted'

import { AcceptedFriendsStyles, FriendMenuItemStyle } from './styles'

import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const AcceptedFriends = () => {
   const myFriends = useGetAccepted()
   return (
      <AcceptedFriendsStyles>
         <Typography sx={{ mb: 5 }} variant='h5'>
            Ismerősök
         </Typography>
         {myFriends.map((friend) => (
            <FriendMenuItemStyle onClick={() => console.log('Chat indítása ')} key={friend._id}>
               <ChatAvatar
                  firstName={friend.firstName}
                  sureName={friend.sureName}
                  selectedProfilePicturePath={friend.selectedProfilePicture[0].path}
               />
               <Typography variant='body1'>{`${friend.firstName} ${friend.sureName}`}</Typography>
            </FriendMenuItemStyle>
         ))}
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
