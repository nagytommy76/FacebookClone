import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'

export const StyledPaper = styled(Paper)(({ theme }) => ({
   width: '80%',
   minHeight: '700px',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   display: 'flex',
   flexDirection: 'row',

   [theme.breakpoints.down('md')]: {
      width: '95%',
      minHeight: '85%',
   },
}))

export const StyledChatAside = styled('aside')(({ theme }) => ({
   flex: 2,
}))

export const StyledChatMessagesContainer = styled('section')(({ theme }) => ({
   flex: 6,
}))

export const StyledTabList = styled(TabList)({
   borderRight: 1,
   borderColor: 'divider',
   height: '100%',
   '& .MuiTabs-indicator': {
      backgroundColor: '#f5ab0b',
      width: '5px',
   },
})

export const StyledTab = styled(Tab)({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'start',

   textTransform: 'none',
   textAlign: 'left',
   height: '80px',
})
