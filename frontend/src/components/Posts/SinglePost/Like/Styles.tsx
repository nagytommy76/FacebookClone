import { styled } from '@mui/material'
import Image from 'next/image'

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'

// LIke section
export const CustomTooltipTitle = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} enterDelay={500} leaveDelay={500} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      minWidth: 360,
      backgroundColor: 'transparent',
      padding: 0,
   },
}))

export const StyledPaperContainer = styled(Paper)({
   padding: '.7rem .3rem',
   display: 'flex',
   width: '100%',
   justifyContent: 'space-between',
})

export const StyledImage = styled(Image)(({ theme }) => ({
   cursor: 'pointer',
   transition: 'transform .25s ease',
   ['&:hover']: {
      transform: 'scale(1.5)',
   },
}))

export const ButtonGroupStyle = styled('div')({
   display: 'flex',
   flexDirection: 'row',
   gap: '2px',
})
