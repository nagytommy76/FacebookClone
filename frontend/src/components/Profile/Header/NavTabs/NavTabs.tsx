import React from 'react'

import { StyledTab, StyledTabs } from '../Styles/HeaderStyle'

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   }
}

const NavTabs: React.FC<{
   handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
   tabValue: number
}> = ({ handleTabChange, tabValue }) => {
   return (
      <StyledTabs
         textColor='primary'
         value={tabValue}
         onChange={handleTabChange}
         aria-label='navigation tabs'>
         <StyledTab label='Bejegyzések' {...a11yProps(0)} />
         <StyledTab label='Névjegy' {...a11yProps(1)} />
         <StyledTab label='Ismerős' {...a11yProps(2)} />
         <StyledTab label='Fényképek' {...a11yProps(3)} />
      </StyledTabs>
   )
}

export default NavTabs
