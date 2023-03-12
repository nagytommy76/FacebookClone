import Link from 'next/link'
import { useAppSelector } from '../../app/redux/store'

import ThemeSwitch from './Includes/ThemeSwitch'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Navbar = () => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   return (
      <AppBar position='sticky'>
         <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
               Facebook 2.0
            </Typography>
            {!isLoggedIn && (
               <Link href='/login'>
                  <Button color='inherit'>Belépés</Button>
               </Link>
            )}
            <ThemeSwitch />
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
