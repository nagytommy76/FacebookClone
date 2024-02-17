import { useState } from 'react'

import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const EditMenu = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleEditWork = () => {
      console.log('Work EDIT')
      setAnchorEl(null)
   }

   const handleRemoveWork = () => {
      console.log('Work remove')
      setAnchorEl(null)
   }

   return (
      <>
         <IconButton
            onClick={handleClick}
            sx={{ position: 'absolute', right: 5, top: 5 }}
            color='warning'
            aria-label='more-options'
         >
            <MoreVertIcon />
         </IconButton>
         <Menu
            id='edit-delete-more-options'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            MenuListProps={{
               'aria-labelledby': 'edit-delete-more-options',
            }}
         >
            <MenuItem onClick={handleEditWork}>
               <ListItemIcon>
                  <EditIcon fontSize='small' />
               </ListItemIcon>
               <ListItemText>Modosítás</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleRemoveWork}>
               <ListItemIcon>
                  <DeleteIcon fontSize='small' />
               </ListItemIcon>
               <ListItemText>Törlés</ListItemText>
            </MenuItem>
         </Menu>
      </>
   )
}

export default EditMenu
