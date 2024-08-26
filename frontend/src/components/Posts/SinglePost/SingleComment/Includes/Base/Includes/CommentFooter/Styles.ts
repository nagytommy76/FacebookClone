import { styled } from '@mui/material'

export const CommentFooterStyle = styled('footer')({
   maxWidth: 220,
   marginTop: 5,

   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'flex-start',
   gap: '8px',
})

export const StyledCommentAnswerButton = styled('span')({
   cursor: 'pointer',
   '&:hover': { textDecoration: 'underline' },
})
