'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useAppSelector } from '../../utils/redux/store'
import useSocketIoConnect from './Hooks/useSocketIoConnect'
import useSetMobileView from './Hooks/useSetMobileView'

import Menu from './Includes/Menu/Menu'
import Avatar from './Includes/Avatar/Avatar'
import NotificationContextProvider from './Includes/Notification/Context/NotificationContextProvider'
import LeftSide from './Includes/LeftSide/LeftSide'

const ChatButton = dynamic(() => import('./Chat/ChatButton/ChatButton'))

import { StyledNavbarToolbar, RightSideContainer } from './Style'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'

const Navbar = () => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   useSocketIoConnect()
   useSetMobileView()
   return (
      <>
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
         <ChatButton />
      </>
   )
}

export default Navbar
