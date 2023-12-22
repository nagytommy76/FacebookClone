import React, { useEffect, useContext, useCallback } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import useButtonColor from './Hooks/useButtonColor'
import useHandleFn from './Hooks/useHandleFn'
import { useAppSelector } from '@/utils/redux/store'
import type { IPostLike, LikeTypes } from '@/types/LikeTypes'
import { socket } from '@/src/utils/socketIo'

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
   const { postsDispatch } = useContext(PostContext)
   const userId = useAppSelector((state) => state.auth.userId)
   const { likeBtnIcon, likeButtonColor, likeBtnText, setButtonColor } = useButtonColor()
   const {
      setLikeIdToDelete,
      handleLikeBtnClick,
      handleSetLikeAndButtonColor,
      handleCommentLikeBtnClick,
      handleCommentAnswerLikeClick,
      handleSendPostLike,
      handleSendCommentLike,
      handleSendAnswerLike,
   } = useHandleFn(setButtonColor, postId, commentId)

   const onLikePost = useCallback(
      (args: { likeType: IPostLike; postData: { _id: string } }[]) => {
         postsDispatch({
            type: 'ADD_SINGLE_SOCKET_POST_LIKE',
            payload: { likes: args[0].likeType, toModifyPostId: args[0].postData._id },
         })
      },
      [postsDispatch]
   )

   useEffect(() => {
      socket.on('likedPost', onLikePost)
      return () => {
         socket.off('likedPost', onLikePost)
      }
   }, [onLikePost])

   useEffect(() => {
      postLikes.map((like) => {
         // Itt kiválasztom, hogy a belépett user mit nyomott (isLike, isAngry stb...)
         if (userId === like.userId) {
            setLikeIdToDelete(like._id)
            const likeType = Object.keys(like.reactionType).filter(
               (key) => like.reactionType[key]
            )[0] as LikeTypes
            handleSetLikeAndButtonColor(likeType)
         }
      })
   }, [postLikes, userId])

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
