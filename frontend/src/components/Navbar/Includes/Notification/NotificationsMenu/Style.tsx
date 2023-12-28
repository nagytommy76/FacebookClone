import { styled } from '@mui/material'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'

export const StyledMenuItem = styled(MenuItem)({
   width: '450px',
   position: 'relative',
})

export const StyledTextArea = styled('div')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledIsActive = styled('span', {
   shouldForwardProp: (prop) => prop !== 'isRead',
})(({ isRead = false }: { isRead: boolean }) => ({
   position: 'absolute',
   top: 10,
   right: 10,

   width: '10px',
   height: '10px',
   backgroundColor: 'green',
   borderRadius: '50%',
   display: `${isRead ? 'none' : 'block'}`,
}))

export const StyledImage = styled(Image)({
   borderRadius: '50%',
   marginRight: 8,
})
