import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'

import { StyledTabText } from './Styles'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import type { IPopulatedUserData } from '@/Chat/Types'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const TabLabel: React.FC<{
   participant: IPopulatedUserData
   totalUnreadMsgCount?: number
   captionText?: string | null
}> = ({ participant, captionText = '', totalUnreadMsgCount = 0 }) => {
   const isOnlineFriends = useAppSelector((state) => state.chat.isOnlineFriends)
   return (
      <>
         <ChatAvatar
            fullName={`${participant.sureName} ${participant.firstName}`}
            selectedProfilePicturePath={participant.selectedProfilePicture[0].path}
            isRead={isOnlineFriends && isOnlineFriends[participant._id] ? false : true}
         />
         <Badge badgeContent={totalUnreadMsgCount} color='error'>
            <StyledTabText>
               <Typography variant='body1'>
                  {participant.firstName} {participant.sureName}
               </Typography>
               <Typography variant='caption' sx={{ textOverflow: 'ellipsis' }}>
                  {captionText}
               </Typography>
            </StyledTabText>
         </Badge>
      </>
   )
}

export default TabLabel
