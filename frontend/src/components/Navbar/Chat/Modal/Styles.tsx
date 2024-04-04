import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const StyledPaper = styled(Paper)(({ theme }) => ({
   width: '80%',
   minHeight: '700px',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   display: 'flex',
   flexDirection: 'row',

   [theme.breakpoints.down('md')]: {
      width: '95%',
      minHeight: '85%',
   },
}))
