import { styled, Toolbar } from '@mui/material'

export const RightSideContainer = styled('div')({
   width: '100px',

   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
})

export const StyledNavbarToolbar = styled(Toolbar)({
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft: '1rem',
   paddingRight: '1rem',
})
