import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

export const AcceptedFriendsStyles = styled('aside')(({ theme }) => ({
   width: '300px',
   height: '600px',
   marginLeft: 25,
   position: 'sticky',
   top: '80px',

   padding: 18,

   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

export const FriendMenuItemStyle = styled(MenuItem)(({ theme }) => ({
   width: '100%',
   marginBottom: 10,
   padding: '.6rem .3rem',
   borderRadius: 5,
   transition: 'all .2s ease',
}))

export const FriendNameStyle = styled(Typography)(({ theme }) => ({
   marginLeft: 10,
}))
