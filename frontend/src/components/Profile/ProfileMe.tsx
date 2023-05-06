import { useState } from 'react'
import dynamic from 'next/dynamic'
import { StyledMeContainer } from './Styles/Style'
import useGetUserData from './Hooks/useGetUserData'

import NavTabs from './Header/NavTabs/NavTabs'
const ProfileHeader = dynamic(() => import('./Header/Header'))
const Body = dynamic(() => import('./Body/Body'))

const ProfileMe = () => {
   const { userData } = useGetUserData()
   const [tabValue, setTabValue] = useState<number>(0)
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }

   return (
      <StyledMeContainer>
         <ProfileHeader>
            <NavTabs handleTabChange={handleTabChange} tabValue={tabValue} />
         </ProfileHeader>
         <Body tabValue={tabValue} />
      </StyledMeContainer>
   )
}

export default ProfileMe
