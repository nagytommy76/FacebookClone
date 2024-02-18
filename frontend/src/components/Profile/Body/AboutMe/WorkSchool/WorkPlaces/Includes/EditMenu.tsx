import dynamic from 'next/dynamic'
import useHandleMenu from './Hooks/useHandleMenu'
import useDeleteWork from './Hooks/useDeleteWork'
import useEditWork from './Hooks/useEditWork'
import useConfirm from './Hooks/useConfirm'

import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ConfirmDelete = dynamic(() => import('@/Base/ConfirmDelete/ConfirmDelete'))

const EditMenu: React.FC<{ workId: string }> = ({ workId }) => {
   const { isOpen, setIsOpen, handleOpenDialog, handleCloseDialog } = useConfirm()
   const { handleClose, handleClickOpen, anchorEl, open } = useHandleMenu()
   const { handleEditWork } = useEditWork()
   const { handleRemoveWorkMutate, handleOpenConfirm } = useDeleteWork(
      handleOpenDialog,
      handleClose,
      handleCloseDialog,
      workId
   )

   return (
      <>
         <IconButton
            onClick={handleClickOpen}
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
            <MenuItem onClick={handleOpenConfirm}>
               <ListItemIcon>
                  <DeleteIcon fontSize='small' />
               </ListItemIcon>
               <ListItemText>Törlés</ListItemText>
            </MenuItem>
         </Menu>
         <ConfirmDelete
            createdAt=''
            handleCloseAndDelete={handleRemoveWorkMutate}
            isOpen={isOpen}
            setIsDialogOpen={setIsOpen}
            otherTextToDisplay={'Biztos szeretnéd törölni ezt a munkahelyed?'}
         />
      </>
   )
}

export default EditMenu
