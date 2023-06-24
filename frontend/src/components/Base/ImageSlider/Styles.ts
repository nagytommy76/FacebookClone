import { styled } from '@mui/material'
import Image from 'next/image'

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

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
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
})
export const StyledImageContainer = styled('div')(({ theme }) => ({
   position: 'relative',
   width: '90%',
   height: '100%',
   [theme.breakpoints.down('sm')]: {
      width: '100%',
   },
}))

export const StyledModalImage = styled(Image)({
   width: '100%',
   height: '100%',
   objectFit: 'contain',
})

// ICONS -----------------------------------------------------
export const CloseIconStyle = styled(CloseIcon)({
   color: '#FFF',
   cursor: 'pointer',
   position: 'absolute',
   fontSize: '55px',
   top: 5,
   left: 5,
   zIndex: 10,
})

export const NavigateLeftIconButtonStyle = styled(IconButton)({
   position: 'absolute',
   color: '#FFF',
   fontSize: '30px',
   top: '50%',
   left: 5,
})
export const NavigateRightIconButtonStyle = styled(IconButton)({
   position: 'absolute',
   color: '#FFF',
   fontSize: '30px',
   top: '50%',
   right: 5,
   transform: 'rotate(-180deg)',
})
