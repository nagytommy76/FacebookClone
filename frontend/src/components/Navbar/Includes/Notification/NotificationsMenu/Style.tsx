import { styled } from '@mui/material'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'

export const StyledMenuContainer = styled('div')({
   width: '100%',
   display: 'flex',
   position: 'relative',
})

export const StyledMenuItem = styled(MenuItem)({
   width: '450px',
   marginBottom: 2,
})

export const StyledEmptyMenuItem = styled('section')({
   width: '450px',
   height: '300px',

   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
})

export const StyledTextArea = styled('div')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledIsActive = styled('span', {
   shouldForwardProp: (prop) => prop !== 'isRead',
})(({ isRead = false }: { isRead: boolean }) => ({
   display: `${isRead ? 'none' : 'flex'}`,
   width: '12px',
   height: '12px',

   position: 'absolute',
   top: '50%',
   right: 10,

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
}))

export const StyledImage = styled(Image)({
   borderRadius: '50%',
   marginRight: 8,
})
