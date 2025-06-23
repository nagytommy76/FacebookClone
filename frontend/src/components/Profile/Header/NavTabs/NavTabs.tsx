import React, { useContext } from 'react'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import a11yProps from '../../Body/Includes/a11Props'

import { StyledTab, StyledTabs } from '../Styles/HeaderStyle'

const NavTabs = () => {
   const { handleTabChange, tabValue } = useContext(ProfileContext)
   return (
      <StyledTabs
         textColor='primary'
         value={tabValue}
         onChange={handleTabChange}
         variant='scrollable'
         scrollButtons
         allowScrollButtonsMobile
         aria-label='navigation tabs'
      >
         <StyledTab label='Bejegyzések' {...a11yProps(0)} />
         <StyledTab label='Névjegy' {...a11yProps(1)} />
         <StyledTab label='Ismerőseim' {...a11yProps(2)} />
         <StyledTab label='Fényképek' {...a11yProps(3)} />
      </StyledTabs>
   )
}

export default NavTabs
