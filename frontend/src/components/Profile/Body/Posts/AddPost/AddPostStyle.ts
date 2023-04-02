import { styled } from '@mui/material'
import Image from 'next/image'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

export const AddPostStyle = styled(Paper)({
   marginTop: 16,
   marginBottom: 16,
   height: '70px',
   padding: '0 1rem',

   display: 'flex',
   alignItems: 'center',
   justifyItems: 'center',
})

export const CustomAddPostButton = styled(Button)({
   width: '95%',
   borderRadius: '30px',
   backgroundColor: 'rgba(100,100,100, 0.35)',
   paddingLeft: 15,

   color: 'inherit',
   fontWeight: 400,
   fontSize: '1.15rem',
   textAlign: 'left',
   justifyContent: 'flex-start',
   textTransform: 'none',
   '&:hover, &.MuiButtonBase': { backgroundColor: 'rgba(150,150,150, 0.45)' },
})

export const CustomNextImage = styled(Image)({
   width: 'auto',
   borderRadius: '50%',
   marginRight: '.75rem',
})
