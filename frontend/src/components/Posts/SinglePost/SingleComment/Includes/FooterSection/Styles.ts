import { styled } from '@mui/material'

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
