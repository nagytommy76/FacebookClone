import { styled } from '@mui/material'

export const StyledWorkItem = styled('div')(({ theme }) => ({
   position: 'relative',
   width: '100%',
   padding: '1rem',
   margin: '.5rem 0',

   backgroundColor: theme.palette.secondary.main,
   borderRadius: 3,
}))
