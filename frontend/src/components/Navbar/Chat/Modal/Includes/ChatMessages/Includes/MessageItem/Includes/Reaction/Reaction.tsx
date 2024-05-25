import dynamic from 'next/dynamic'
import useMutateLike from './Hooks/useMutateLike'

import IconButton from '@mui/material/IconButton'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

const LikeTooltip = dynamic(() => import('@/Base/LikeTooltip/LikeTooltip'))

const Reaction: React.FC<{ messageId: string }> = ({ messageId }) => {
   const likeMutate = useMutateLike(messageId)

   return (
      <LikeTooltip
         LikeCommentButtonComponent={
            <IconButton aria-label='add-message-reaction' size='small'>
               <SentimentVerySatisfiedIcon fontSize='inherit' />
            </IconButton>
         }
         setLikeFunction={(likeType: any) => likeMutate(likeType)}
      />
   )
}

export default Reaction
