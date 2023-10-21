import { styled } from '@mui/material'

export const StyledPostHeadSkeleton = styled('header')(({ theme }) => ({
   width: '32%',
   [theme.breakpoints.down('sm')]: {
      width: '65%',
   },
}))

export const StyledFlexContainer = styled('div')(({ theme }) => ({
   width: '100%',
   height: '55px',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
}))

export const BodySectionStyle = styled('div')({
   display: 'flex',
   flexWrap: 'wrap',
   flexDirection: 'column',
   justifyContent: 'center',
   minHeight: '200px',
})

export const LikeAndCommentSection = styled('div')({
   margin: '.5rem 0',
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
})

export const StyledAddLikeComment = styled('div')({
   margin: '.5rem 0',
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-evenly',
})
