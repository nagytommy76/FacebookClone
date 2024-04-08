import Image from 'next/image'

import { StyledIsActive } from '@/styles/BaseStyles'
import Avatar from '@mui/material/Avatar'

const ChatAvatar: React.FC<{
   fullName: string
   selectedProfilePicturePath: string
   width?: number
   height?: number
   isRead?: boolean
}> = ({ fullName, selectedProfilePicturePath, width = 56, height = 56, isRead = false }) => {
   return (
      <>
         <Avatar sx={{ width, height, mr: 2, position: 'relative' }}>
            <Image width={width} height={height} alt={fullName} src={selectedProfilePicturePath} />
            <StyledIsActive isRead={isRead} rightPosition='1px' bottomPosition='10px' topPosition='unset' />
         </Avatar>
      </>
   )
}

export default ChatAvatar
