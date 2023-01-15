import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'

const Login = () => {
   return (
      <StyledLoginContainer>
         <StyledPaper elevation={3}>Login</StyledPaper>
      </StyledLoginContainer>
   )
}

export default Login

const StyledLoginContainer = styled('section')({
   height: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
})

const StyledPaper = styled(Paper)({
   padding: 16,
})
