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
         width: '85%',
      },
   },
}))

// MODAL IMAGE LIST STYLE ---------------------------------------------------------------------------------------------------------

export const StyledImageContainer = styled('section')({
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',
   gap: '.25rem',
})

export const StyledUploadedPic = styled(Image)<{ isHighlighted: boolean }>(({ isHighlighted, theme }) => ({
   width: '175px',
   height: '175px',
   objectFit: 'cover',
   ...(isHighlighted && {
      border: '2px solid red',
   }),
}))
