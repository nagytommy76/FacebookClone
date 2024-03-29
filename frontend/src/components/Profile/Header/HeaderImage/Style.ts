import { styled } from '@mui/material'
import Image from 'next/image'

import Dialog from '@mui/material/Dialog'

export const HeaderImage = styled(Image)(({ theme }) => ({
   width: '168px',
   height: '168px',
   borderRadius: '50%',
   marginRight: '18px',
   objectFit: 'cover',

   cursor: 'pointer',
   transition: 'filter .15s ease',
   [theme.breakpoints.down('sm')]: {
      marginRight: 0,
   },
   ['&:hover']: {
      filter: 'brightness(120%)',
   },
}))

// MODAL - DIALOG STYLE -----------------------------------------------------------------------------------------------------------
export const StyledDialog = styled(Dialog)(({ theme }) => ({
   '& .MuiPaper-root': {
      width: '55%',
   },
   [theme.breakpoints.down('sm')]: {
      '& .MuiPaper-root': {
         width: '95%',
         margin: 0,
      },
      width: '100%',
   },
}))

// MODAL IMAGE LIST STYLE ---------------------------------------------------------------------------------------------------------

export const StyledImageContainer = styled('section')(({ theme }) => ({
   display: 'grid',
   justifyContent: 'center',
   gridTemplateColumns: 'auto auto auto',
   gap: '.5rem',
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto auto',
   },
}))

export const StyledUploadedPic = styled(Image, {
   shouldForwardProp: (propName) => propName !== 'isHighlighted',
})<{ isHighlighted: boolean }>(({ isHighlighted, theme }) => ({
   width: '175px',
   height: '175px',
   objectFit: 'cover',

   cursor: 'pointer',
   transition: ' filter .15s ease-in-out',
   [`&:hover`]: {
      filter: 'brightness(120%)',
   },

   ...(isHighlighted && {
      border: '1px solid grey',
   }),
}))
