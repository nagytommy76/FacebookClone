import { styled } from '@mui/material'

export const StyledLeftSide = styled('aside')({
   width: '30px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

export const HorizontalLineStyle = styled('span', {
   shouldForwardProp: (prop) => prop !== 'isChildComment',
})<{ isChildComment: boolean }>(({ isChildComment, theme }) => ({
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
}))
