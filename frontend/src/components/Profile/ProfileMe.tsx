import { useState } from 'react'
import dynamic from 'next/dynamic'
import { StyledMeContainer } from './Styles/Style'

import ProfileContextProvider from './Context/ProfileContextProvider'
import NavTabs from './Header/NavTabs/NavTabs'
const ProfileHeader = dynamic(() => import('./Header/Header'))
const Body = dynamic(() => import('./Body/Body'))

const ProfileMe = () => {
   const [tabValue, setTabValue] = useState<number>(0)
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }

   return (
      <ProfileContextProvider>
         <StyledMeContainer>
            <ProfileHeader>
               <NavTabs handleTabChange={handleTabChange} tabValue={tabValue} />
            </ProfileHeader>
            <Body tabValue={tabValue} />
         </StyledMeContainer>
      </ProfileContextProvider>
   )
}

export default ProfileMe
