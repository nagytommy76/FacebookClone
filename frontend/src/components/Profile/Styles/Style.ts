import { styled } from '@mui/system'

export const StyledMeContainer = styled('section')(({ theme }) => ({
   width: '50%',
   minHeight: '100%',
   margin: 'auto',

   [theme.breakpoints.down('sm')]: {
      width: '95%',
   },
}))
