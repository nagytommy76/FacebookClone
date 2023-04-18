import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledImageGridContainer = styled('section')({
   display: 'grid',
   gridTemplateColumns: '250px 250px 250px',
   gap: '4px',
})

export const FirstGridImage = styled(Image)({
   objectFit: 'cover',
   gridColumnStart: 1,
   gridColumnEnd: 4,
   width: '100%',
})

export const StyledImage = styled(Image)({
   objectFit: 'cover',
   width: '250px',
   height: '250px',
})
