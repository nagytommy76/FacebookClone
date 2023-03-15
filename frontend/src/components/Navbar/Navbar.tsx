import Link from 'next/link'
import { useAppSelector } from '../../utils/redux/store'

import ThemeSwitch from './Includes/ThemeSwitch'

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
            <p>ide jön a menü</p>
            {!isLoggedIn && (
               <Link href='/login'>
                  <Button color='inherit'>Belépés</Button>
               </Link>
            )}
            <ThemeSwitch />
         </StyledNavbarToolbar>
      </AppBar>
   )
}

export default Navbar
