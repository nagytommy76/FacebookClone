import { styled } from '@mui/material'
import Image from 'next/image'

import Typography from '@mui/material/Typography'

// Header section
export const PostHeaderStyle = styled('div')(({ theme }) => ({
   width: '40%',
   paddingTop: '1rem',
   margin: '.8rem 1rem',
   display: 'flex',
   alignItems: 'center',

   [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '.8rem 0rem .8rem 1rem',
   },
}))

export const StyledProfileImage = styled(Image)({
   borderRadius: '50%',
   objectFit: 'cover',
})

export const HeaderRightTitleSection = styled('div')({
   paddingLeft: '10px',
   flexGrow: 1,
})

export const StyledClickableTypography = styled(Typography)({
   ['&:hover']: {
      cursor: 'pointer',
      textDecoration: 'underline',
   },
})
