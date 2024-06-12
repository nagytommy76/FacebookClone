import { styled } from '@mui/material/styles'

export const MainPageContainer = styled('section')(({ theme }) => ({
   position: 'relative',
   width: '100%',
   minHeight: '100%',
   margin: 'auto',

   display: 'flex',
   justifyContent: 'center',

   [theme.breakpoints.down('md')]: {
      overflowX: 'hidden',
   },
}))
