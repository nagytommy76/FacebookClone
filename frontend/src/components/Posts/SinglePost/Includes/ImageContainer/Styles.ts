import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledImageGridContainer = styled('section', {
   shouldForwardProp: (prop) => prop !== 'imageLength',
})(({ imageLength = 0 }: { imageLength: number }) => ({
   width: '100%',
   // gridTemplateColumns: 'auto auto auto',
   gridTemplateColumns: `${
      (imageLength === 2 ? '100%' : 'unset') || (imageLength <= 3 ? 'auto auto auto' : 'unset')
   }`,
   gridTemplateRows: `${imageLength === 2 ? 'auto auto' : 'unset'}`,
   display: 'grid',
   gap: '2px',
}))

export const FirstGridImage = styled(Image)({
   cursor: 'pointer',
   objectFit: 'cover',
   gridColumnStart: 1,
   gridColumnEnd: 4,
   width: '100%',
})

export const StyledImage = styled(Image, {
   shouldForwardProp: (prop) => prop !== 'imageLength',
})(({ imageLength = 0 }: { imageLength: number }) => ({
   cursor: 'pointer',
   objectFit: 'cover',
   width: '100%',
   height: `${imageLength === 2 ? '500px' : '250px'}`,
   zIndex: 1,
}))

export const OverlayedContainer = styled('div')({
   position: 'relative',
})

export const OverlayedContent = styled('span')({
   cursor: 'pointer',
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
