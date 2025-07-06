import useButtonColor from './Hooks/useButtonColor'
import useHandleFn from './Hooks/useHandleFn'
import useLikePostSocket from './Hooks/Sockets/useLikePostSocket'
import useRemoveLikeSocket from './Hooks/Sockets/useRemoveLikeSocket'
import type { ILike } from '@/types/LikeTypes'

import Button from '@mui/material/Button'

import LikeTooltip from '@/Base/LikeTooltip/LikeTooltip'

const Like: React.FC<{
   postId: string
   postLikes: ILike[]
   isPostLike?: boolean
   commentId: string
   children?: React.ReactNode
   isChildComment?: boolean
   isDeleted?: boolean
}> = ({
   postId,
   postLikes,
   isPostLike = true,
   children,
   commentId,
   isChildComment = false,
   isDeleted = false,
}) => {
   const { likeBtnIcon, likeButtonColor, likeBtnText, setButtonColor } = useButtonColor()
   useLikePostSocket()
   useRemoveLikeSocket()
   const {
      handleLikeBtnClick,
      handleCommentLikeBtnClick,
      handleCommentAnswerLikeClick,
      handleSendPostLike,
      handleSendCommentLike,
      handleSendAnswerLike,
   } = useHandleFn(setButtonColor, postId, commentId, postLikes)

   return (
      <>
         <LikeTooltip
            setLikeFunction={
               isPostLike ? handleSendPostLike : isChildComment ? handleSendAnswerLike : handleSendCommentLike
            }
            LikeCommentButtonComponent={
               isPostLike ? (
                  <Button
                     sx={{ color: likeButtonColor, textTransform: 'none' }}
                     disableRipple
                     onClick={handleLikeBtnClick}
                     fullWidth
                     startIcon={likeBtnIcon}
                  >
                     {likeBtnText}
                  </Button>
               ) : (
                  <Button
                     variant='text'
                     disabled={isDeleted}
                     onClick={isChildComment ? handleCommentAnswerLikeClick : handleCommentLikeBtnClick}
                     style={{ color: likeButtonColor }}
                  >
                     {likeBtnText}
                  </Button>
               )
            }
         ></LikeTooltip>
         {children}
      </>
   )
}

export default Like
