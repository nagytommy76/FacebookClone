import dynamic from 'next/dynamic'
import type { ILike, LikeTypes } from '@/types/LikeTypes'

import useHandleLike from './Hooks/useHandleLike'
import useTooltip from './Hooks/useTooltip'
import useDeleteLikeSocket from './Hooks/Sockets/useDeleteLikeSocket'

import ReactionIcon from './Includes/ReactionIcon'
import IconButton from '@mui/material/IconButton'

const LikeTooltip = dynamic(() => import('@/Base/LikeTooltip/LikeTooltip'))
/**
 * Renders a reaction icon button with a like tooltip component for a given message.
 *
 * @param {string} messageId - The ID of the message.
 * @param {ILike[]} reactions - The reactions of the message.
 * @return {ReactElement} The rendered reaction component.
 */
const Reaction: React.FC<{ messageId: string; reactions: ILike[] }> = ({ messageId, reactions }) => {
   const { handleClick, handleClose, open } = useTooltip()
   const { handleLikeOrDelete, like } = useHandleLike(messageId, reactions)
   useDeleteLikeSocket()

   return (
      <LikeTooltip
         open={open}
         handleClose={handleClose}
         LikeCommentButtonComponent={
            <IconButton onClick={handleClick} aria-label='add-message-reaction' size='small'>
               <ReactionIcon likeType={like} />
            </IconButton>
         }
         setLikeFunction={(likeType: LikeTypes) => handleLikeOrDelete(likeType)}
      />
   )
}

export default Reaction
