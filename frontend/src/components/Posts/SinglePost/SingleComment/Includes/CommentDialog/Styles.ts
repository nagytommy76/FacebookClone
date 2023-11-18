import { styled } from '@mui/material'

export const StyledDialogContext = styled('div')(({ theme }) => ({
   width: '800px',
   overflowX: 'hidden',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      overflowX: 'auto',
   },
}))
