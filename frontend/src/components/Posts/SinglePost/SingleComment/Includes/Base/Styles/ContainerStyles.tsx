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
      cursor: 'pointer',

      top: '50px',
      width: '10px',
      height: 'calc(100% - 50px)',

      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent',

      backgroundColor: 'rgba(50, 50, 50, 0.5)',
      // backgroundColor: theme.,
      backgroundClip: 'padding-box',

      ['&:hover']: {
         backgroundColor: theme.palette.grey[100],
      },
   })
)

const StyledSlider = styled('span', {
   shouldForwardProp: (prop) => prop !== 'success',
})<{ isChildComment: boolean }>(({ isChildComment, theme }) => ({
   ...(isChildComment &&
      {
         // the overrides added when the new prop is used
      }),
}))
