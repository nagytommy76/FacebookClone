import { styled } from '@mui/material'
import Image from 'next/image'

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'

export const StyledImageGridContainer = styled('section')({
   width: '100%',
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',
   gap: '2px',
})

// Header section
export const PostHeaderStyle = styled('div')({
   padding: '1rem 1rem',
})

export const FirstGridImage = styled(Image)({
   objectFit: 'cover',
   gridColumnStart: 1,
   gridColumnEnd: 4,
   width: '100%',
})

export const StyledImage = styled(Image)({
   objectFit: 'cover',
   width: '100%',
   height: '250px',
})

// "Footer" section

export const FooterSectionStyle = styled('footer')({
   width: '100%',
   padding: '1rem 1rem',
})

export const ButtonGroupStyle = styled('div')({
   display: 'flex',
   flexDirection: 'row',
   gap: '2px',
})

// LIke section
export const CustomTooltipTitle = styled(Tooltip)({
   backgroundColor: 'transparent',
   padding: 0,
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
      padding: 0,
   },
})
