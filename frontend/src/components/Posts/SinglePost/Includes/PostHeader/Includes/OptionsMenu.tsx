import { useState } from 'react'
import useDeletePost from '../Hooks/useDeletePost'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const OptionsMenu: React.FC<{ removeSinglePostById: (toDeletePostId: string) => void }> = ({
   removeSinglePostById,
}) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }
   const { postDeleteMutation } = useDeletePost(removeSinglePostById)

   const handleDeleteClick = () => {
      postDeleteMutation()
      handleClose()
   }

   return (
      <div style={{ position: 'absolute', right: 5 }}>
         <IconButton onClick={handleClick}>
            <MoreHorizIcon fontSize='inherit' />
         </IconButton>
         <Menu id='delete-post-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Módosítás</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Törlés</MenuItem>
         </Menu>
      </div>
   )
}

export default OptionsMenu
