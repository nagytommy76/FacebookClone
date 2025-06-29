import { styled } from '@mui/material/styles'
import Image from 'next/image'

export const PostImageContainer = styled('div')({
   maxWidth: '800px',
   height: '100%',
   margin: '2rem 0',
})

export const StyledImage = styled(Image)({
   cursor: 'pointer',
   objectFit: 'cover',
   width: '100%',
})

export const GridImage = styled('div')(({ theme }) => ({
   width: '100%',
   height: '100%',
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   justifyItems: 'center',
   gap: '.75rem',

   [`@media(max-width: ${theme.breakpoints.values.sm}px)`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
   },
   [`@media(max-width: ${theme.breakpoints.values.xs}px)`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
   },
}))
