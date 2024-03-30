import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'

export const AcceptedFriendsStyles = styled('aside')({
   width: '300px',
   height: '600px',
   marginLeft: 25,
   position: 'sticky',
   top: '80px',

   padding: 18,
})

export const FriendMenuItemStyle = styled(MenuItem)(({ theme }) => ({
   width: '100%',
   marginBottom: 10,
   padding: '.6rem .3rem',
   borderRadius: 5,
   transition: 'all .2s ease',
}))
