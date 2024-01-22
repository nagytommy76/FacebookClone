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
