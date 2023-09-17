import { styled } from '@mui/material'

// Container Sttyle --------------------------------------------------------

export const StyledCommentContainer = styled('div', {
   shouldForwardProp: (prop) => prop !== 'isChildComment',
})(({ isChildComment = false }: { isChildComment: boolean }) => ({
   maxWidth: `${isChildComment ? 'calc(100% - 54px)' : '100%'}`,
   margin: '.75rem 0',
   display: 'flex',
   flexDirection: 'column',
}))

export const StyledListElement = styled('div')({
   position: 'relative',
   listStyle: 'none',
   display: 'flex',
   flexDirection: 'row',
})

export const StyledRightSide = styled('div')({
   width: '100%',
   marginLeft: 8,
})
