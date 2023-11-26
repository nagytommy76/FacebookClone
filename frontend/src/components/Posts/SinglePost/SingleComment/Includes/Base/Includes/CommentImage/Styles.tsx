import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledCommentImgContainer = styled('div')({
   marginTop: 12,
   position: 'relative',
})

export const StyledCommentImg = styled(Image)({
   objectFit: 'cover',
})

export const IconButtonStyle = styled('span')({
   position: 'absolute',
   right: 5,
   top: 0,
})
