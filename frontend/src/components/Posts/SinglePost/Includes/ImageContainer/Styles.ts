import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledImageGridContainer = styled('section')({
   width: '100%',
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',
   gap: '2px',
})

export const FirstGridImage = styled(Image)({
   objectFit: 'cover',
   gridColumnStart: 1,
   gridColumnEnd: 4,
   width: '100%',
})

export const StyledImage = styled(Image)({
   objectFit: 'cover',
   width: '100%',
   height: '250px',
   zIndex: 1,
})

export const OverlayedContainer = styled('div')({
   position: 'relative',
})

export const OverlayedContent = styled('span')({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'rgba(20,20,20, .6)',

   fontSize: '47px',

   width: '100%',
   height: '100%',
   zIndex: 3,
   position: 'absolute',
   top: 0,
   right: 0,
})
