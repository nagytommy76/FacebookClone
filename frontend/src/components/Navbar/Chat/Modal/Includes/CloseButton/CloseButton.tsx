import React from 'react'
import { useAppDispatch } from '@/reduxStore/store'
import { setChatModalOpen } from '@/reduxStore/slices/ChatSlice'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const CloseButton = () => {
   const dispatch = useAppDispatch()
   return (
      <IconButton
         onClick={() => dispatch(setChatModalOpen(false))}
         sx={{ position: 'absolute', right: 2, top: 2 }}
         aria-label='close'
         color='error'
         size='medium'
      >
         <CloseIcon fontSize='inherit' />
      </IconButton>
   )
}

export default CloseButton
