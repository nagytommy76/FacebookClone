import { styled } from '@mui/material/styles'

export const StyledTabText = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   textAlign: 'left',

   width: '220px',
   whiteSpace: 'nowrap',
   overflow: 'hidden',

   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))
