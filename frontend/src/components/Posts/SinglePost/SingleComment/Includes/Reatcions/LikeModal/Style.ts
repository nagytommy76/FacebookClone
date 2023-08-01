import { styled } from '@mui/material'

import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'

export const StyledModalPaper = styled(Paper)({
   minWidth: 400,
   minHeight: 400,
   padding: '.75rem 1rem',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   borderRadius: 15,
})

// "HEADER SECTION"
export const ModalHeader = styled('header')({
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
})

export const StyledTab = styled(Tab)({
   fontSize: 16,
   textTransform: 'none',
   ['&.MuiButtonBase-root']: {
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      minHeight: 50,
      minWidth: 72,
   },
})

export const StyledIconButton = styled(IconButton)({
   position: 'absolute',
   right: 0,
   top: 5,
})
