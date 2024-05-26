import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const StyledMessageBoxContainer = styled('section')({
   width: '100%',
   height: '100%',

   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
})
export const StyledMessageBox = styled(Paper)(({ theme }) => ({
   position: 'relative',
   backgroundColor: theme.palette.secondary.main,
   boxShadow: 'none',
   height: '700px',

   margin: '1rem 0',
   padding: '.5rem',
   overflowY: 'auto',

   display: 'flex',
   flexDirection: 'column',

   [theme.breakpoints.down('xl')]: {
      width: '95%',
      height: '90%',
   },

   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
   },
}))
