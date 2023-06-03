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
   minWidth: 200,
   padding: 12,
   borderRadius: 20,
   backgroundColor: 'rgba(100,100,100, 0.35)',

   position: 'relative',
}))

export const LikeIconStyle = styled(Paper)({
   minWidth: 35,
   display: 'flex',
   justifyContent: 'space-between',

   borderRadius: 20,
   padding: '.1rem .3rem',
   position: 'absolute',
   right: 0,
   bottom: -10,
   fontSize: 13,

   backgroundColor: 'rgba(100,100,100, 1)',
})

export const IconStackStyle = styled('span')({
   display: 'flex',
   marginRight: 5,
})

// FOOTER ---------------------------------------------------------------------------
export const CommentFooterStyle = styled('footer')({
   width: 160,
   marginTop: 5,

   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
})
