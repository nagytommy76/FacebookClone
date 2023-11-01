import { styled } from '@mui/material'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'

export const StyledImagePreviewContainer = styled('div')({
   height: '50%',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledRemoveIcon = styled(IconButton)({
   position: 'absolute',
   right: 5,
   top: 5,
})

export const StyledImagePreview = styled(Image)({
   flexGrow: 1,
   marginBottom: '.2rem',
   objectFit: 'cover',
   width: '100%',
})
