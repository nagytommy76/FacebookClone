import { useState } from 'react'
import dynamic from 'next/dynamic'
import { StyledMeContainer } from './Styles/Style'

import ProfileContextProvider from './Context/ProfileContextProvider'
import NavTabs from './Header/NavTabs/NavTabs'
const ProfileHeader = dynamic(() => import('./Header/Header'))
const Body = dynamic(() => import('./Body/Body'))

const ProfileMe = () => {
   return (
      <ProfileContextProvider>
         <StyledMeContainer>
            <ProfileHeader>
               <NavTabs />
            </ProfileHeader>
            <Body />
         </StyledMeContainer>
      </ProfileContextProvider>
   )
}

export default ProfileMe
