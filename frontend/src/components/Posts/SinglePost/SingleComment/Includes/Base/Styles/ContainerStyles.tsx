import { styled } from '@mui/material'

// Container Sttyle --------------------------------------------------------

export const StyledCommentContainer = styled('div', {
   shouldForwardProp: (prop) => prop !== 'isChildComment',
})<{ isChildComment?: boolean }>(({ theme, isChildComment = false }) => ({
   position: 'relative',
   maxWidth: `${isChildComment ? 'calc(100% - 54px)' : '100%'}`,
   marginTop: '1rem',
   marginBottom: `${!isChildComment ? '1.4rem' : '0'}`,
   marginRight: 0,
   display: 'flex',
   flexDirection: 'column',
}))

export const StyledListElement = styled('div')((theme) => ({
   position: 'relative',
   display: 'flex',
   flexDirection: 'row',
}))

export const StyledRightSide = styled('div')({
   width: '100%',
   marginLeft: 8,
})
