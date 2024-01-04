'use client'
import Link from 'next/link'
import { useAppSelector } from '../../utils/redux/store'

import Menu from './Includes/Menu/Menu'
import Avatar from './Includes/Avatar/Avatar'
import NotificationContextProvider from './Includes/Notification/Context/NotificationContextProvider'
import LeftSide from './Includes/LeftSide/LeftSide'
import { StyledNavbarToolbar, RightSideContainer } from './Style'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'

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
                  <NotificationContextProvider />
                  <Avatar />
               </RightSideContainer>
            )}
         </StyledNavbarToolbar>
      </AppBar>
   )
}

export default Navbar
