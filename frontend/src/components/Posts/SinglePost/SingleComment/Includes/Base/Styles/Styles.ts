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

export const StyledRightContainer = styled('section')({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
})

// FOOTER ---------------------------------------------------------------------------
export const CommentFooterStyle = styled('footer')({
   width: 160,
   marginTop: 5,

   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
})

export const StyledCommentAnswerButton = styled('span')({
   cursor: 'pointer',
   '&:hover': { textDecoration: 'underline' },
})
