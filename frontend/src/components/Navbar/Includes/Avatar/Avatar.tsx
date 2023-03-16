import React, { useState } from 'react'

import ThemeSwitch from '../ThemeSwitch'

import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { deepOrange } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'

const AvatarComponent = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <>
         <Stack direction='row' spacing={1}>
            <Tooltip title='Fiók'>
               <IconButton size='small' onClick={handleClick}>
                  <Avatar sx={{ bgcolor: deepOrange[500], width: 45, height: 45 }}>NT</Avatar>
               </IconButton>
            </Tooltip>
         </Stack>
         <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            PaperProps={{
               sx: {
                  width: 230,
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem onClick={handleClose}>
               <Avatar sizes='small' /> Profilom
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Logout fontSize='small' />
               </ListItemIcon>
               Kilépés
            </MenuItem>
            <MenuItem disableRipple={true} disableTouchRipple={true}>
               Téma <ThemeSwitch />
            </MenuItem>
         </Menu>
      </>
   )
}

export default AvatarComponent
