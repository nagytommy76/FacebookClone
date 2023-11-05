import { useState } from 'react'
import dynamic from 'next/dynamic'
import ImageContextProvider from '@/src/components/Posts/HandlePosts/Context/ImageContextProvider'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const ConfirmDeletePost = dynamic(() => import('./ConfirmDeletePost'), {
   loading: () => <h1>Töltés egyelőre</h1>,
})
const ModifyPost = dynamic(() => import('../../../../HandlePosts/ModifyPost/ModifyPost'), {
   loading: () => <h1>Töltés egyelőre</h1>,
})

const OptionsMenu = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
   const [isModifyDialogOpen, setIsModifyDialogOpen] = useState<boolean>(false)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const openModifyDialog = () => {
      setIsModifyDialogOpen(true)
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
            <Menu id='delete-post-menu' anchorEl={anchorEl} open={open} onClose={openModifyDialog}>
               <MenuItem onClick={openModifyDialog}>Módosítás</MenuItem>
               <MenuItem onClick={openConfirmDialog}>Törlés</MenuItem>
            </Menu>
         </div>
         <ConfirmDeletePost isOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
         <ImageContextProvider>
            <ModifyPost isOpen={isModifyDialogOpen} setIsModifyDialogOpen={setIsModifyDialogOpen} />
         </ImageContextProvider>
      </>
   )
}

export default OptionsMenu
