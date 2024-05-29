import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'

export const StyledChatAside = styled('aside')(({ theme }) => ({
   flex: 1,

   [theme.breakpoints.down('md')]: {
      width: '70px',
   },
}))

export const StyledTabList = styled(TabList)(({ theme }) => ({
   borderRight: 1,
   borderColor: 'divider',
   height: '100%',
   '& .MuiTabs-indicator': {
      backgroundColor: '#f5ab0b',
      width: '5px',
   },

   [theme.breakpoints.down('md')]: {
      width: '70px',
   },
}))

export const StyledTab = styled(Tab)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'start',

   textTransform: 'none',
   textAlign: 'left',
   height: '80px',

   [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      height: '60px',
      minWidth: '60px',
      padding: '0',
   },
}))
