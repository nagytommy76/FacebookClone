import React, { Dispatch, SetStateAction } from 'react'
import moment from 'moment'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const ConfirmDelete: React.FC<{
   isOpen: boolean
   createdAt: string
   postOrCommentText?: string
   handleCloseAndDelete: () => void
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}> = ({ isOpen, createdAt, postOrCommentText = 'poszt', setIsDialogOpen, handleCloseAndDelete }) => {
   return (
      <Dialog
         open={isOpen}
         onClose={() => setIsDialogOpen(false)}
         aria-labelledby='alert-dialog-title'
         aria-describedby='alert-dialog-description'
      >
         <DialogTitle id='alert-dialog-title'>Biztos törölni szeretnéd?</DialogTitle>
         <DialogContent>
            <DialogContentText variant='body1' id='alert-dialog-description'>
               A(z) {moment(createdAt).format('YYYY MMMM D k:mm:ss')}-kor létrehozott {postOrCommentText}{' '}
               véglegesen törölve lesz. Folytatod?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Mégsem</Button>
            <Button onClick={handleCloseAndDelete} color='error' variant='contained' autoFocus>
               Törlés
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default ConfirmDelete
