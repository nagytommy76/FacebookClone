import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

export const StyledPaperContainer = styled(Paper)({
   backgroundColor: 'rgba(100,100,100, 0.35)',
})

export const StyledTextContainer = styled('div')({
   padding: '1rem 1rem',
})

export const StyledTextInput = styled(TextField)({
   ['& .MuiTextField-root::before']: {
      content: '""',
   },
   ['& .MuiInputBase-root::before']: {
      content: '""',
   },
})
