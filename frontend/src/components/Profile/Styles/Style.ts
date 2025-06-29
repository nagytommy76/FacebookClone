import { styled } from '@mui/system'

export const StyledMeContainer = styled('section')(({ theme }) => ({
   maxWidth: '800px',
   minHeight: '95%',
   margin: 'auto',

   [theme.breakpoints.down('sm')]: {
      width: '95%',
   },
}))
