'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useAppSelector } from '../../utils/redux/store'

import useSocket from './Hooks/Socket/useSocket'
import useOnlineFriend from './Hooks/Socket/useOnlineFriend'
import useCheckFriends from './Hooks/Socket/useCheckFriends'
import useSocketIoConnect from './Hooks/useSocketIoConnect'
import useSetMobileView from './Hooks/useSetMobileView'

import Menu from './Includes/Menu/Menu'
import Avatar from './Includes/Avatar/Avatar'
import NotificationContextProvider from './Includes/Notification/Context/NotificationContextProvider'
import LeftSide from './Includes/LeftSide/LeftSide'

const ChatButton = dynamic(() => import('./Chat/ChatButton/ChatButton'))
const InfoSnackbar = dynamic(() => import('@/Base/InfoSnackbar/InfoSnackbar'))

import { StyledNavbarToolbar, RightSideContainer } from './Style'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'

const Navbar = () => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   useSocket()
   useOnlineFriend()
   useCheckFriends()
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
         <InfoSnackbar />
      </>
   )
}

export default Navbar
