import { styled } from '@mui/material'
import Image from 'next/image'
import Paper from '@mui/material/Paper'

export const StyledPaperContainer = styled(Paper)({
   minWidth: '370px',
   minHeight: '150px',
   display: 'flex',
   alignItems: 'center',
})

export const StyledProfileImage = styled(Image)({
   margin: '1rem',
   width: 110,
   height: 110,
   borderRadius: '50%',
   objectFit: 'cover',
})

export const StyledProfileBody = styled('div')({
   height: '150px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',
})

export const StyledIconParagraph = styled('p')({
   fontWeight: 350,
   fontSize: '16px',
   display: 'flex',
   alignContent: 'center',
})
