import { styled } from '@mui/material'
import Image from 'next/image'

// Picture style --------------------------------------------

export const StyledProfileImage = styled(Image)({
   height: 40,
   width: 40,
   borderRadius: 50,
})

export const StyledIsActive = styled('span', {
   shouldForwardProp: (prop) =>
      prop !== 'isRead' && prop !== 'topPosition' && prop !== 'rightPosition' && prop !== 'bottomPosition',
})(
   ({
      isRead = false,
      topPosition = '50%',
      bottomPosition = 'unset',
      rightPosition = '10px',
   }: {
      isRead: boolean
      topPosition?: string
      bottomPosition?: string
      rightPosition?: string
   }) => ({
      display: `${isRead ? 'none' : 'flex'}`,
      width: '25%',
      height: '25%',

      flexDirection: 'row',
      position: 'absolute',
      top: topPosition,
      bottom: bottomPosition,
      right: rightPosition,

      backgroundColor: '#09F905',
      borderRadius: '50%',
      boxShadow: `none`,

      '&::after': {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '10px',
         height: '10px',
         borderRadius: '50%',
         animation: 'ripple 1.2s infinite ease-in-out',
         border: '1px solid #09F905',
         content: '""',
      },
      '@keyframes ripple': {
         '0%': {
            transform: 'scale(.5)',
            opacity: 1,
         },
         '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
         },
      },
   })
)
