import { styled } from '@mui/material'
import Image from 'next/image'

import Typography from '@mui/material/Typography'

// Header section
export const PostHeaderStyle = styled('div')(({ theme }) => ({
   maxWidth: '40%',
   padding: '1rem',
   display: 'flex',
   alignItems: 'center',
   [theme.breakpoints.down('md')]: {
      maxWidth: '90%',
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
