import dynamic from 'next/dynamic'

import { StyledTabText } from './Styles'
import Typography from '@mui/material/Typography'

const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))

const TabLabel: React.FC<{
   selectedProfilePicturePath: string
   fullName: string
   captionText: string
}> = ({ captionText, fullName, selectedProfilePicturePath }) => {
   return (
      <>
         <ChatAvatar
            firstName='-'
            sureName={fullName}
            selectedProfilePicturePath={selectedProfilePicturePath}
         />
         <StyledTabText>
            <Typography variant='body1'>{fullName}</Typography>
            <Typography variant='caption'>{captionText}</Typography>
         </StyledTabText>
      </>
   )
}

export default TabLabel
