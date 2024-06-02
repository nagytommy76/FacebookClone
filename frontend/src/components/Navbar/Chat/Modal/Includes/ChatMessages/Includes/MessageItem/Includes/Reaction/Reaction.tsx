import dynamic from 'next/dynamic'
import type { ILike } from '@/types/LikeTypes'

import useMutateLike from './Hooks/useMutateLike'
import useTooltip from './Hooks/useTooltip'
import useGetUsersLikeId from '@/hooks/Like/useGetUsersLikeId'
import useSetBtnColor from './Hooks/useSetBtnColor'

import IconButton from '@mui/material/IconButton'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

const LikeTooltip = dynamic(() => import('@/Base/LikeTooltip/LikeTooltip'))
/**
 * Renders a reaction icon button with a like tooltip component for a given message.
 *
 * @param {string} messageId - The ID of the message.
 * @param {ILike[]} reactions - The reactions of the message.
 * @return {ReactElement} The rendered reaction component.
 */
const Reaction: React.FC<{ messageId: string; reactions: ILike[] }> = ({ messageId, reactions }) => {
   const { likeButtonColor, setButtonColor } = useSetBtnColor()
   const { handleLikeMutate } = useMutateLike(messageId, setButtonColor)
   const { handleClick, handleClose, open } = useTooltip()
   const { likeIdToDelete } = useGetUsersLikeId(setButtonColor, reactions)

   return (
      <LikeTooltip
         open={open}
         handleClose={handleClose}
         LikeCommentButtonComponent={
            <IconButton
               sx={{ color: likeButtonColor }}
               onClick={handleClick}
               aria-label='add-message-reaction'
               size='small'
            >
               <SentimentVerySatisfiedIcon fontSize='inherit' />
            </IconButton>
         }
         setLikeFunction={(likeType: any) => handleLikeMutate(likeType)}
      />
   )
}

export default Reaction
