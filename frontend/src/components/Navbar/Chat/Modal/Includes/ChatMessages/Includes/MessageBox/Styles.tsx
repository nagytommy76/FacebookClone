import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const StyledMessageBoxContainer = styled('section')({
   width: '100%',
   height: '100%',

   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
})
export const StyledMessageBox = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.secondary.main,
   boxShadow: 'none',
   height: '500px',

   margin: '1rem 0',
   padding: '.5rem',
   overflowY: 'auto',

   display: 'flex',
   flexDirection: 'column',
}))
