import Link from 'next/link'
import { useAppSelector } from '../../utils/redux/store'

import Menu from './Includes/Menu/Menu'
import Avatar from './Includes/Avatar/Avatar'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'

import LeftSide from './Includes/LeftSide/LeftSide'
import { StyledNavbarToolbar } from './Style'

const Navbar = () => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   return (
      <AppBar position='sticky'>
         <StyledNavbarToolbar>
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
      </AppBar>
   )
}

export default Navbar
