import { styled } from '@mui/material'
import Image from 'next/image'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Paper from '@mui/material/Paper'

export const ProfileHeader = styled(Paper)({
   marginTop: 16,
   padding: '20px 20px 0px 20px',
   width: '100%',
   minHeight: '200px',
})

export const HeaderTop = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifySelf: 'center',
   },
}))

export const HeaderImage = styled(Image)(({ theme }) => ({
   width: '168px',
   height: '168px',
   borderRadius: '50%',
   marginRight: '18px',
   objectFit: 'cover',
   [theme.breakpoints.down('sm')]: {
      marginRight: 0,
   },
}))

export const HeadTitleSection = styled('div')(({ theme }) => ({
   height: '65%',
   flexGrow: 1,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-around',
   [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: '15px',
   },
}))

export const ProfileModifySection = styled('div')(({ theme }) => ({
   flexGrow: 0,
   alignSelf: 'flex-end',
   [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
   },
}))

export const StyledTab = styled(Tab)({
   textTransform: 'none',
   fontSize: '16px',
   '&.Mui-selected': { color: '#087aea' },
})

export const StyledTabs = styled(Tabs)(({ theme }) => ({
   '& .MuiTabs-indicator': { backgroundColor: '#087aea' },
   '& .MuiTabs-scrollButtons.Mui-disabled': {
      display: 'none',
   },
   [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      '& .MuiTabs-scrollButtons.Mui-disabled': {
         display: 'inherit',
         opacity: 0.3,
      },
   },
}))
