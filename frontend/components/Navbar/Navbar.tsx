import Link from 'next/link'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = () => {
   return (
      <AppBar position='sticky'>
         <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
               <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
               News
            </Typography>
            <Link href='/login'>
               <Button color='inherit'>Belépés</Button>
            </Link>
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
