import Image from 'next/image'

import { StyledIsActive } from '@/styles/BaseStyles'
import Avatar from '@mui/material/Avatar'

const ChatAvatar: React.FC<{ fullName: string; selectedProfilePicturePath: string }> = ({
   fullName,
   selectedProfilePicturePath,
}) => {
   return (
      <>
         <Avatar sx={{ width: 50, height: 50, mr: 2, position: 'relative' }}>
            <Image width={56} height={56} alt={fullName} src={selectedProfilePicturePath} />
            <StyledIsActive isRead={false} rightPosition='1px' bottomPosition='10px' topPosition='unset' />
         </Avatar>
      </>
   )
}

export default ChatAvatar
