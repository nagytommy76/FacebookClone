import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const StyledPaper = styled(Paper)(({ theme }) => ({
   width: '70%',
   minHeight: '70%',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   display: 'flex',
   flexDirection: 'row',

   [theme.breakpoints.down('xl')]: {
      width: '95%',
      height: '90%',
   },
   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
   },
}))
