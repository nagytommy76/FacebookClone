import Link from 'next/link'
import { useAppSelector } from '../../utils/redux/store'

import Menu from './Includes/Menu/Menu'
import Avatar from './Includes/Avatar/Avatar'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import LeftSide from './Includes/LeftSide/LeftSide'
import { StyledNavbarToolbar } from './Style'

const Navbar = () => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   return (
      <AppBar position='sticky'>
         <Container maxWidth='xl'>
            <StyledNavbarToolbar disableGutters>
               <LeftSide />
               <Menu />
               {!isLoggedIn ? (
                  <Link href='/login'>
                     <Button color='inherit'>Belépés</Button>
                  </Link>
               ) : (
                  <Avatar />
               )}
            </StyledNavbarToolbar>
         </Container>
      </AppBar>
   )
}

export default Navbar
