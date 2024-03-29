import React from 'react'
import Image from 'next/image'
import useGetAccepted from './Hooks/useGetAccepted'

import { AcceptedFriendsStyles, FriendMenuItemStyle } from './styles'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

const AcceptedFriends = () => {
   const myFriends = useGetAccepted()
   return (
      <AcceptedFriendsStyles>
         <Typography sx={{ mb: 5 }} variant='h5'>
            Ismerősök
         </Typography>
         {myFriends.map((friend) => (
            <FriendMenuItemStyle onClick={() => console.log('Chat indítása ')} key={friend._id}>
               <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                  <Image
                     width={56}
                     height={56}
                     alt={`${friend.sureName} ${friend.firstName}`}
                     src={friend.selectedProfilePicture[0].path}
                  />
               </Avatar>
               <Typography variant='h6'>{`${friend.firstName} ${friend.sureName}`}</Typography>
            </FriendMenuItemStyle>
         ))}
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
