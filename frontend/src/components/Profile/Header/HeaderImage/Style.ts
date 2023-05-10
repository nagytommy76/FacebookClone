import { styled } from '@mui/material'
import Image from 'next/image'

export const HeaderImage = styled(Image)(({ theme }) => ({
   width: '168px',
   height: '168px',
   borderRadius: '50%',
   marginRight: '18px',
   objectFit: 'cover',

   cursor: 'pointer',
   transition: 'filter .15s ease',
   [theme.breakpoints.down('sm')]: {
      marginRight: 0,
   },
   ['&:hover']: {
      filter: 'brightness(120%)',
   },
}))
