import { styled } from '@mui/material'

import Paper from '@mui/material/Paper'

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
