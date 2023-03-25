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

export const HeaderTop = styled('div')({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
})

export const HeaderImage = styled(Image)({
   width: '168px',
   height: '168px',
   borderRadius: '50%',
   marginRight: '18px',
})

export const HeadTitleSection = styled('div')({
   height: '65%',
   flexGrow: 1,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-around',
})

export const ProfileModifySection = styled('div')({ flexGrow: 0, alignSelf: 'flex-end' })

export const StyledTab = styled(Tab)({
   textTransform: 'none',
   fontSize: '16px',
   '&.Mui-selected': { color: '#087aea' },
})

export const StyledTabs = styled(Tabs)({ '& .MuiTabs-indicator': { backgroundColor: '#087aea' } })
