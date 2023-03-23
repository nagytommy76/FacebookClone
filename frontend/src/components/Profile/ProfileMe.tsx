import dynamic from 'next/dynamic'
import { StyledMeContainer } from './Styles/Style'

const ProfileHeader = dynamic(() => import('./Header/Header'))

const ProfileMe = () => {
   return (
      <StyledMeContainer>
         <ProfileHeader />
      </StyledMeContainer>
   )
}

export default ProfileMe
