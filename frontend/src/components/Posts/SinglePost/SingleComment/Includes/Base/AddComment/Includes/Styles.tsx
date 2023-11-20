import { styled } from '@mui/material'
import Image from 'next/image'

import IconButton from '@mui/material/IconButton'

export const AddedImageContainer = styled('div')({
   position: 'relative',
   marginTop: '1rem',
   widht: '100%',
})

export const StyledAddedImage = styled(Image)({
   objectFit: 'cover',
})

export const StyledCloseIconBtn = styled(IconButton)({
   position: 'absolute',
   right: 0,
   top: 0,
})
