import { useState } from 'react'

import { DesktomMenuElement, MobileMenuElement } from './Includes/MenuElements'

import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MenuMUI from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'

const Menu = () => {
   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget)
   }

   const handleCloseNavMenu = () => {
      setAnchorElNav(null)
   }

   return (
      <>
         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
               size='large'
               aria-label='account of current user'
               aria-controls='menu-appbar'
               aria-haspopup='true'
               onClick={handleOpenNavMenu}
               color='inherit'>
               <MenuIcon />
            </IconButton>
            <MenuMUI
               id='menu-appbar'
               anchorEl={anchorElNav}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
               }}
               keepMounted
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
               }}
               open={Boolean(anchorElNav)}
               onClose={handleCloseNavMenu}
               sx={{
                  display: { xs: 'block', md: 'none' },
               }}>
               <MenuItem onClick={handleCloseNavMenu}>
                  <MobileMenuElement />
               </MenuItem>
            </MenuMUI>
         </Box>
         <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <DesktomMenuElement />
         </Box>
      </>
   )
}

export default Menu
