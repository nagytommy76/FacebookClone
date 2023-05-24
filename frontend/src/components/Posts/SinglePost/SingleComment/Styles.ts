import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'

export const StyledListElement = styled('li')({ listStyle: 'none', display: 'flex' })

export const StyledCommentContainer = styled(Paper)(({ theme }) => ({
   padding: 10,
   margin: '.6rem 0',
   borderRadius: 25,
   backgroundColor: 'rgba(100,100,100, 0.35)',
}))
