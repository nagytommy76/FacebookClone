import { styled } from '@mui/material'

export const StyledModalContainer = styled('div')({
   outline: 'none',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '100%',
   height: '100%',
   backgroundColor: 'rgba(0, 0, 0, 1)',

   display: 'flex',
   //    flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
})

export const StyledImageContainer = styled('div')({
   width: '100%',
   height: '65%',
})
