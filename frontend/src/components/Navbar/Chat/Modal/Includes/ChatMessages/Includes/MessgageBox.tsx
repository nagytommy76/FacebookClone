import dynamic from 'next/dynamic'
import useMessage from '../Hooks/useMessage'

import { ProfileSection } from './Styles'
import Typography from '@mui/material/Typography'

const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))
const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const MessgageBox: React.FC<{
   userData: { _id: string; fullName: string; selectedProfilePicturePath: string }
}> = ({ userData }) => {
   const { chatMsg, chatImagePath, handleChatMsg, setChatImagePath } = useMessage()

   return (
      <div>
         <ProfileSection>
            <ChatAvatar
               width={60}
               height={60}
               fullName={userData.fullName}
               selectedProfilePicturePath={userData.selectedProfilePicturePath}
            />
            <Typography variant='body1'>{userData.fullName}</Typography>
         </ProfileSection>
         <AddTextBase
            value={chatMsg}
            placeholderText='...'
            setImagePath={setChatImagePath}
            onClickFunction={() => {}}
            handleChangeValue={handleChatMsg}
            handleChangeValueWithEmoji={() => {}}
         />
      </div>
   )
}

export default MessgageBox
