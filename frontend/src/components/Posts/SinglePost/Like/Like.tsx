import useButtonColor from './Hooks/useButtonColor'
import useHandleFn from './Hooks/useHandleFn'
import useSocket from './Hooks/useSocket'
import type { IPostLike } from '@/types/LikeTypes'

import Button from '@mui/material/Button'
import { StyledCommentLikeButton } from './Styles'

import CustomTooltipTitle from '../../../Base/CustomTooltipTitle'
import Reactions from './Reactions'

const Like: React.FC<{
   postId: string
   postLikes: IPostLike[]
   isPostLike?: boolean
   commentId: string
   children?: React.ReactNode
   isChildComment?: boolean
}> = ({ postId, postLikes, isPostLike = true, children, commentId, isChildComment = false }) => {
   const { likeBtnIcon, likeButtonColor, likeBtnText, setButtonColor } = useButtonColor()
   useSocket()
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
         <CustomTooltipTitle
            placement='top'
            title={
               <Reactions
                  setLike={
                     isPostLike
                        ? handleSendPostLike
                        : isChildComment
                        ? handleSendAnswerLike
                        : handleSendCommentLike
                  }
               />
            }
         >
            {isPostLike ? (
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
            )}
         </CustomTooltipTitle>
         {children}
      </>
   )
}

export default Like
