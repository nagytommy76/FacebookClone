import dynamic from 'next/dynamic'
import type { ILike, LikeTypes } from '@/types/LikeTypes'

import useMutateLike from './Hooks/useMutateLike'
import useTooltip from './Hooks/useTooltip'
import useGetUsersLikeId from '@/hooks/Like/useGetUsersLikeId'
import useSetBtnColor from './Hooks/useSetBtnColor'
import useDeleteLike from './Hooks/useDeleteLike'

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
   const { likeButtonColor, setButtonColor } = useSetBtnColor()
   const { handleLikeMutate } = useMutateLike(messageId, setButtonColor)
   const { handleClick, handleClose, open } = useTooltip()
   const { likeIdToDelete, like } = useGetUsersLikeId(setButtonColor, reactions)
   const deleteLikeMutate = useDeleteLike(messageId, likeIdToDelete)

   const handleLikeOrDelete = (likeType: LikeTypes) => {
      // Itt kéne törölnöm a likeot ha ugyan arra a reakció iconra kattintok, ha a like !== undefined.
      if (like === undefined) {
         handleLikeMutate(likeType)
      } else if (like === likeType) {
         // Itt törlök
         deleteLikeMutate()
         console.log('Itt törölnem', likeIdToDelete)
      }
   }

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
               <ReactionIcon likeType={like} />
            </IconButton>
         }
         setLikeFunction={(likeType: LikeTypes) => handleLikeOrDelete(likeType)}
      />
   )
}

export default Reaction
