import { styled } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'

export const StyledTabBodyContainer = styled(TabPanel)({
   height: '100%',
   padding: '.75rem 0',
})

export const ReactorElement = styled('div')({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   margin: '.65rem 0',
})

export const StyledImageContainer = styled('section')({
   marginRight: 12,
   display: 'flex',
   alignItems: 'center',
   position: 'relative',
})

export const StyledIconImage = styled('span')({
   position: 'absolute',
   right: -5,
   bottom: -5,
})
