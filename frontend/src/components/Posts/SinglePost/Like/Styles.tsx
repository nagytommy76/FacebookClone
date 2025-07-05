import { styled } from '@mui/material'
import Image from 'next/image'
import Paper from '@mui/material/Paper'

export const StyledPaperContainer = styled(Paper)({
   padding: '.7rem .3rem',
   display: 'flex',
   width: '100%',
   justifyContent: 'space-between',
})

export const StyledImage = styled(Image)(({ theme }) => ({
   cursor: 'pointer',
   transition: 'transform .25s ease',
   ['&:hover']: {
      transform: 'scale(1.5)',
   },
}))
