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

export const StyledImage = styled(Image)({
   borderRadius: '50%',
   marginRight: 8,
})
