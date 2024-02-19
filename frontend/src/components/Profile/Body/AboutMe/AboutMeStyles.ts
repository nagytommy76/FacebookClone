import { styled } from '@mui/system'

import { BodyPaper } from '../Styles'

export const StyledTabContainer = styled(BodyPaper)(({ theme }) => ({
   width: '100%',
   minHeight: '40%',
   display: 'flex',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
   },
}))

export const RightSection = styled('section')({
   width: '99%',
   minHeight: '500px',
   marginLeft: 13,
   marginTop: 10,

   display: 'flex',
   flexDirection: 'column',
})
