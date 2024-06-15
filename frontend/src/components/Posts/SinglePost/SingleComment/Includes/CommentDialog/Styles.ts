import { styled } from '@mui/material'
import Dialog from '@mui/material/Dialog'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
   '& .MuiPaper-root': {
      [theme.breakpoints.down('md')]: {
         maxWidth: '100%',
         margin: 0,
      },
   },
}))

export const StyledDialogContext = styled('div')(({ theme }) => ({
   width: '800px',
   overflowX: 'hidden',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      overflowX: 'auto',
   },
}))
