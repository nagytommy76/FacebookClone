import dynamic from 'next/dynamic'
import { useAppSelector } from '@/src/utils/redux/store'

import { ProfileSection } from './Styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const Profile: React.FC<{ fullName: string; chatFirendId: string; selectedProfilePicturePath: string }> = ({
   fullName,
   selectedProfilePicturePath,
   chatFirendId,
}) => {
   const isOnlineFriends = useAppSelector((state) => state.chat.isOnlineFriends)
   return (
      <ProfileSection>
         <ChatAvatar
            width={60}
            height={60}
            fullName={fullName}
            selectedProfilePicturePath={selectedProfilePicturePath}
            isRead={true}
         />
         <div>
            <Typography variant='h6'>{fullName}</Typography>
            {isOnlineFriends && isOnlineFriends[chatFirendId] ? (
               <Typography sx={{ color: '#77c70e' }} variant='body1'>
                  online
               </Typography>
            ) : (
               <Typography sx={{ color: '#fd2b27' }} variant='body1'>
                  offline
               </Typography>
            )}
         </div>
      </ProfileSection>
   )
}

export default Profile
