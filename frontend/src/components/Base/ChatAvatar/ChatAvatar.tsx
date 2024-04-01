import Image from 'next/image'

import { StyledIsActive } from '@/styles/BaseStyles'
import Avatar from '@mui/material/Avatar'

const ChatAvatar: React.FC<{ sureName: string; firstName: string; selectedProfilePicturePath: string }> = ({
   firstName,
   sureName,
   selectedProfilePicturePath,
}) => {
   return (
      <>
         <Avatar sx={{ width: 50, height: 50, mr: 2, position: 'relative' }}>
            <Image width={56} height={56} alt={`${sureName} ${firstName}`} src={selectedProfilePicturePath} />
            <StyledIsActive isRead={false} rightPosition='1px' bottomPosition='10px' topPosition='unset' />
         </Avatar>
      </>
   )
}

export default ChatAvatar
