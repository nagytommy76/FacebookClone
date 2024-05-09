import useButtonColor from './Hooks/useButtonColor'
import useHandleFn from './Hooks/useHandleFn'
import useLikePostSocket from './Hooks/Sockets/useLikePostSocket'
import useRemoveLikeSocket from './Hooks/Sockets/useRemoveLikeSocket'
import type { IPostLike } from '@/types/LikeTypes'

import Button from '@mui/material/Button'
import { StyledCommentLikeButton } from './Styles'

import LikeTooltip from '@/Base/LikeTooltip/LikeTooltip'

const Like: React.FC<{
   postId: string
   postLikes: IPostLike[]
   isPostLike?: boolean
   commentId: string
   children?: React.ReactNode
   isChildComment?: boolean
}> = ({ postId, postLikes, isPostLike = true, children, commentId, isChildComment = false }) => {
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
                  <StyledCommentLikeButton
                     onClick={isChildComment ? handleCommentAnswerLikeClick : handleCommentLikeBtnClick}
                     style={{ color: likeButtonColor }}
                  >
                     Tetszik
                  </StyledCommentLikeButton>
               )
            }
         ></LikeTooltip>
         {children}
      </>
   )
}

export default Like
