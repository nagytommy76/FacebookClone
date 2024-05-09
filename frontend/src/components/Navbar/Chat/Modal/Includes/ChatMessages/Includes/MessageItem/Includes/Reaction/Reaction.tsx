import dynamic from 'next/dynamic'

import IconButton from '@mui/material/IconButton'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

const LikeTooltip = dynamic(() => import('@/Base/LikeTooltip/LikeTooltip'))

const Reaction: React.FC<{ messageId: string }> = ({ messageId }) => {
   return (
      <LikeTooltip
         LikeCommentButtonComponent={
            <IconButton aria-label='add-message-reaction' size='small'>
               <SentimentVerySatisfiedIcon fontSize='inherit' />
            </IconButton>
         }
         setLikeFunction={(likeType: any) => {
            console.log('Reagálás: ', likeType, messageId)
         }}
      />
   )
}

export default Reaction
