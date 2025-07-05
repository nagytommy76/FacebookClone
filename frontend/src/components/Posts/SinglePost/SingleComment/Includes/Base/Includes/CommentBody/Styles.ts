import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const StyledCommentPaper = styled(Paper)(({ theme }) => ({
   width: 'max-content',
   maxWidth: '90%',
   padding: 12,
   borderRadius: 20,
   backgroundColor: 'rgba(100,100,100, 0.35)',

   position: 'relative',
}))

export const StyledCommentParagraph = styled(Typography)({ lineHeight: '1.25rem', fontSize: '1rem' })
