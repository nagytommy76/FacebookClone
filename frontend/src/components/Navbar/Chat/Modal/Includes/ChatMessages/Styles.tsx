import { styled } from '@mui/material/styles'
import TabPanel from '@mui/lab/TabPanel'

export const StyledChatMessagesContainer = styled('section')(({ theme }) => ({
   flex: 6,

   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
   },
}))

export const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      padding: '.5rem',
   },
}))
