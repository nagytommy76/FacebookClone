import { styled } from '@mui/material'

// Container Sttyle --------------------------------------------------------

export const StyledCommentContainer = styled('div')({
   margin: '.75rem 0',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledListElement = styled('div')({
   position: 'relative',
   listStyle: 'none',
   display: 'flex',
   flexDirection: 'row',
})

export const StyledRightSide = styled('div')({
   maxWidth: '100%',
   marginLeft: 8,
})

export const StyledLeftSide = styled('aside')({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

export const HorizontalLineStyle = styled('span')<{ isChildComment: boolean }>(
   ({ isChildComment, theme }) => ({
      display: isChildComment ? 'block' : 'none',
      position: 'absolute',
      // cursor: 'pointer',

      top: '50px',
      width: '6px',
      height: 'calc(100% - 50px)',

      borderLeft: '2px solid transparent',
      borderRight: '2px solid transparent',

      backgroundColor: 'rgba(100, 100, 100, .55)',
      backgroundClip: 'padding-box',
      transition: 'all .05s ease',
      ['&:hover']: {
         backgroundColor: theme.palette.grey[300],
      },
   })
)