import { styled } from '@mui/material/styles'

export const StyledTabText = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   textAlign: 'left',

   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
})
