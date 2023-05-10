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
})

export const StyledLabelAsButton = styled('label')(({ theme }) => ({
   position: 'relative',
   width: '210px',
   height: '45px',
   borderRadius: '5px',

   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   background: theme.palette.info.main,
   boxShadow: '0 4px 7px rgba(0,0,0,0.4)',
   color: theme.palette.text.primary,

   cursor: 'pointer',
   transition: 'box-shadow .2s ease',

   ['&:hover']: {
      boxShadow: '0 8px 14px rgba(0,0,0,0.4)',
   },
}))
