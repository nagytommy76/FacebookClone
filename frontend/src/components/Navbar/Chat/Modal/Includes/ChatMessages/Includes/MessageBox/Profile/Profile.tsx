import dynamic from 'next/dynamic'
import { ProfileSection, StyledTextSection } from './Styles'

const IsOnline = dynamic(() => import('./Includes/IsOnline'))
const NameLink = dynamic(() => import('./Includes/NameLink'))
const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))
const DeleteMessage = dynamic(() => import('./DeleteMessage/DeleteMessage'))

const Profile: React.FC<{ fullName: string; chatFirendId: string; selectedProfilePicturePath: string }> = ({
   fullName,
   selectedProfilePicturePath,
   chatFirendId,
}) => {
   return (
      <ProfileSection>
         <ChatAvatar
            width={window.innerWidth >= 500 ? 60 : 40}
            height={window.innerWidth >= 500 ? 60 : 40}
            fullName={fullName}
            selectedProfilePicturePath={selectedProfilePicturePath}
            isRead={true}
         />
         <StyledTextSection>
            <NameLink chatFirendId={chatFirendId} fullName={fullName} />
            <IsOnline chatFirendId={chatFirendId} />
         </StyledTextSection>
         <DeleteMessage fullName={fullName} />
      </ProfileSection>
   )
}

export default Profile
