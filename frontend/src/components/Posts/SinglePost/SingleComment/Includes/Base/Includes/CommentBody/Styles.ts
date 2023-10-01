import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'

export const StyledCommentPaper = styled(Paper)(({ theme }) => ({
   width: 'max-content',
   maxWidth: '90%',
   padding: 12,
   borderRadius: 20,
   backgroundColor: 'rgba(100,100,100, 0.35)',

   position: 'relative',
}))

export const StyledCommentParagraph = styled('p')({ lineHeight: '1.25rem', fontSize: '1rem' })
