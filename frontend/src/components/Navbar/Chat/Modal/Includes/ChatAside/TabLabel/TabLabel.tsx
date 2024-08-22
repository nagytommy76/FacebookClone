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
            width={window.innerWidth >= 500 ? 60 : 40}
            height={window.innerWidth >= 500 ? 60 : 40}
         />
         <Badge badgeContent={totalUnreadMsgCount} color='error'>
            <StyledTabText>
               <Typography variant='body1'>
                  {participant.firstName} {participant.sureName}
               </Typography>
               <div
                  style={{
                     width: '100%',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap',
                  }}
               >
                  <Typography variant='caption' sx={{}}>
                     {captionText}
                  </Typography>
               </div>
            </StyledTabText>
         </Badge>
      </>
   )
}

export default TabLabel
