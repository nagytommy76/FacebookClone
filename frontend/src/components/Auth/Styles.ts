import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import Image from 'next/image'

export const StyledAuthContainer = styled('section')({
   height: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
})
// Utánanézni mi a baj: ANY...
const BaseStyledPaper: any = {
   padding: 25,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
}

export const StyledRegisterPaper = styled(Paper)({
   ...BaseStyledPaper,
   width: '500px',
   minHeight: '550px',
})

// Login
export const StyledLoginPaper = styled('div')({
   width: '1200px',
   height: '700px',
   display: 'flex',
})

export const StyledLeftContainer = styled(Paper)({
   height: '100%',
   display: 'flex',
   alignItems: 'center',
})

export const StyledLoginForm = styled('form')({
   ...BaseStyledPaper,
   width: '400px',
   height: '340px',
   alignItems: 'center',

   flex: 1,
})

export const StyledImage = styled(Image)({
   width: '600px',
   height: '100%',
   objectFit: 'cover',

   flex: 2,
})

export const StyledLink = styled(Link)({
   width: '100%',
})
