import Image from 'next/image'

import { StyledBadge } from './Styles'
import Avatar from '@mui/material/Avatar'

const ChatAvatar: React.FC<{
   fullName: string
   selectedProfilePicturePath: string
   width?: number
   height?: number
   isRead?: boolean
}> = ({ fullName, selectedProfilePicturePath, width = 56, height = 56, isRead = false }) => {
   return (
      <StyledBadge
         overlap='circular'
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant='dot'
         invisible={isRead}
      >
         <Avatar sx={{ width, height }}>
            <Image width={width} height={height} alt={fullName} src={selectedProfilePicturePath} />
         </Avatar>
      </StyledBadge>
   )
}

export default ChatAvatar
