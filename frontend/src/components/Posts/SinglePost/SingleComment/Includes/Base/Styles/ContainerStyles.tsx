import { styled } from '@mui/material'

// Container Sttyle --------------------------------------------------------

export const StyledCommentContainer = styled('div', {
   shouldForwardProp: (prop) => prop !== 'isChildComment',
})<{ isChildComment?: boolean }>(({ theme, isChildComment = false }) => ({
   position: 'relative',
   maxWidth: `${isChildComment ? 'calc(100% - 54px)' : '100%'}`,
   minWidth: '50%',
   marginTop: '.3rem',
   marginBottom: `${!isChildComment ? '1.4rem' : '0'}`,
   marginRight: 0,
   display: 'flex',
   flexDirection: 'column',
   [theme.breakpoints.down('md')]: {
      maxWidth: `${isChildComment ? 'calc(100% - 54px)' : '90%'}`,
   },
}))

export const StyledListElement = styled('div')((theme) => ({
   position: 'relative',
   display: 'flex',
}))

export const StyledRightSide = styled('div')({
   width: '100%',
   marginLeft: 8,
})

export const StyledRightContainer = styled('section')({
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
})
