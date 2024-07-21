import { styled } from '@mui/material/styles'

export const StyledMessageSection = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   [theme.breakpoints.down('md')]: {},
}))

export const StyledTypographySection = styled('div')(({ theme }) => ({
   width: '290px',
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '10px',
}))
