import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledImagePreviewContainer = styled('div')({
   height: '50%',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledImagePreview = styled(Image)({
   flexGrow: 1,
   marginBottom: '.2rem',
   objectFit: 'cover',
   width: '100%',
})
