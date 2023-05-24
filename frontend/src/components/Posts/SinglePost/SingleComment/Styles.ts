import Image from 'next/image'
import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'

export const StyledCommentContainer = styled('div')({
   margin: '.75rem 0',
   display: 'flex',
   flexDirection: 'row',
})

// Picture style --------------------------------------------
export const StyledProfileImage = styled(Image)({
   marginRight: 8,
   height: 40,
   width: 40,
   borderRadius: 50,
})

export const StyledListElement = styled('li')({
   listStyle: 'none',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledCommentPaper = styled(Paper)(({ theme }) => ({
   padding: 12,
   borderRadius: 20,
   backgroundColor: 'rgba(100,100,100, 0.35)',
}))

export const CommentFooterStyle = styled('footer')({
   width: 140,
   marginTop: 5,

   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
})
