import dynamic from 'next/dynamic'

import { StyledTabText } from './Styles'
import Typography from '@mui/material/Typography'
import type { IPopulatedUserData } from '@/Chat/Types'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const TabLabel: React.FC<{
   participant: IPopulatedUserData
   captionText?: string | null
}> = ({ participant, captionText = '' }) => {
   return (
      <>
         <ChatAvatar
            fullName={`${participant.sureName} ${participant.firstName}`}
            selectedProfilePicturePath={participant.selectedProfilePicture[0].path}
         />
         <StyledTabText>
            <Typography variant='body1'>
               {participant.firstName} {participant.sureName}
            </Typography>
            <Typography variant='caption' sx={{ textOverflow: 'ellipsis' }}>
               {captionText}
            </Typography>
         </StyledTabText>
      </>
   )
}

export default TabLabel
