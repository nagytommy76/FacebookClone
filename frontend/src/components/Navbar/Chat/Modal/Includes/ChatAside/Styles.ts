import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'

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

export const StyledChatAside = styled('aside')(({ theme }) => ({
   flex: 2,
}))
