import { useState } from 'react'
import useDeletePost from '../Hooks/useDeletePost'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const OptionsMenu = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }
   const { postDeleteMutation } = useDeletePost()

   const handleDeleteClick = () => {
      postDeleteMutation()
      handleClose()
   }

   return (
      <>
         <IconButton onClick={handleClick}>
            <MoreHorizIcon fontSize='inherit' />
         </IconButton>
         <Menu id='delete-post-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Módosítás</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Törlés</MenuItem>
         </Menu>
      </>
   )
}

export default OptionsMenu
