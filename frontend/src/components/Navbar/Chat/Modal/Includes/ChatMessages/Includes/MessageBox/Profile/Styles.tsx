import { styled } from '@mui/material/styles'

export const ProfileSection = styled('div')(({ theme }) => ({
   width: '100%',

   display: 'flex',
   alignItems: 'center',

   [theme.breakpoints.down('md')]: {
      height: '50px',
   },
}))
