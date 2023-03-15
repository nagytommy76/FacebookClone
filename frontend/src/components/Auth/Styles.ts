import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Link from 'next/link'

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
export const StyledLoginPaper = styled(Paper)({
   ...BaseStyledPaper,
   width: '400px',
   height: '340px',
   alignItems: 'center',
})

export const StyledLink = styled(Link)({
   width: '100%',
})
