import { styled } from '@mui/material'
import Image from 'next/image'
import Paper from '@mui/material/Paper'

export const StyledCommentContainer = styled('div')({
   margin: '.75rem 0',
   display: 'flex',
   flexDirection: 'column',
})

// Picture style --------------------------------------------
export const StyledProfileImage = styled(Image)({
   position: 'absolute',
   left: 0,
   top: 0,
   marginRight: 8,
   height: 38,
   width: 38,
   borderRadius: 50,
})

export const StyledListElement = styled('div')({
   position: 'relative',
   paddingLeft: 45,
   listStyle: 'none',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledCommentPaper = styled(Paper)(({ theme }) => ({
   width: 'max-content',
   maxWidth: '90%',
   padding: 12,
   borderRadius: 20,
   backgroundColor: 'rgba(100,100,100, 0.35)',

   position: 'relative',
}))

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