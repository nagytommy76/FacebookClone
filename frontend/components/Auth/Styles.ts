import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'

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
   alignItems: 'center',
   justifyContent: 'space-between',
}

export const StyledRegisterPaper = styled(Paper)({
   ...BaseStyledPaper,
   width: '500px',
   height: '500px',
})

export const StyledPaper = styled(Paper)({
   ...BaseStyledPaper,
   width: '450px',
   height: '360px',
})