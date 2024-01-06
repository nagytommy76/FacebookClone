import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledHeaderImage = styled(Image)({
   objectFit: 'cover',
})

export const FriendsContainer = styled('section')({
   minHeight: '95vh',
   maxWidth: '75%',
   margin: '2rem auto',
})

export const GridContainer = styled('div')(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',
   justifyContent: 'center',
   gap: '20px',

   [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'auto auto',
   },
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto',
   },
}))

export const GridItem = styled('div')({
   width: '300px',
})
