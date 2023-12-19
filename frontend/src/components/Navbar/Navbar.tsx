import Link from 'next/link'
import { useAppSelector } from '../../utils/redux/store'

import Menu from './Includes/Menu/Menu'
import Avatar from './Includes/Avatar/Avatar'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import LeftSide from './Includes/LeftSide/LeftSide'
import { StyledNavbarToolbar, RightSideContainer } from './Style'

const Navbar = () => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   return (
      <AppBar position='sticky'>
         <StyledNavbarToolbar disableGutters>
            <LeftSide />
            <Menu />
            {!isLoggedIn ? (
               <Link href='/login'>
                  <Button color='inherit'>Belépés</Button>
               </Link>
            ) : (
               <RightSideContainer>
                  <Tooltip title='Értesítések' placement='bottom'>
                     <IconButton aria-label='notification' size='large'>
                        <Badge badgeContent={2} color='error'>
                           <NotificationsIcon fontSize='inherit' />
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <Avatar />
               </RightSideContainer>
            )}
         </StyledNavbarToolbar>
      </AppBar>
   )
}

export default Navbar
