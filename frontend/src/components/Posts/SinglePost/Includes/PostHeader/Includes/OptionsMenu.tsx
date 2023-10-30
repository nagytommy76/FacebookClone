import { useState } from 'react'
import dynamic from 'next/dynamic'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const ConfirmDeletePost = dynamic(() => import('./ConfirmDeletePost'), {
   loading: () => <h1>Töltés egyelőre</h1>,
})

const OptionsMenu = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }
   const openConfirmDialog = () => {
      setIsDialogOpen(true)
      setAnchorEl(null)
   }

   return (
      <>
         <div style={{ position: 'absolute', right: 5 }}>
            <IconButton onClick={handleClick}>
               <MoreHorizIcon fontSize='inherit' />
            </IconButton>
            <Menu id='delete-post-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
               <MenuItem onClick={handleClose}>Módosítás</MenuItem>
               <MenuItem onClick={openConfirmDialog}>Törlés</MenuItem>
            </Menu>
         </div>
         <ConfirmDeletePost isOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </>
   )
}

export default OptionsMenu
