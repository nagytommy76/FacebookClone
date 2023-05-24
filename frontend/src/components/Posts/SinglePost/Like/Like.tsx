import React, { useEffect } from 'react'
import useButtonColor from './Hooks/useButtonColor'
import useHandleFn from './Hooks/useHandleFn'
import { useAppSelector } from '../../../../utils/redux/store'
import type { IPostLike, LikeTypes } from './Types'

import Button from '@mui/material/Button'
import { StyledCommentLikeButton } from './Styles'

import CustomTooltipTitle from '../../../Base/CustomTooltipTitle'
import Reactions from './Reactions'

const Like: React.FC<{
   postId: string
   postLikes: IPostLike[]
   isPostLike?: boolean
   children?: React.ReactNode
}> = ({ postId, postLikes, isPostLike = true, children }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const { likeBtnIcon, likeButtonColor, likeBtnText, setButtonColor } = useButtonColor()
   const { handleLikeBtnClick, handleSendPostLike, handleSetLikeAndButtonColor } = useHandleFn(
      setButtonColor,
      postId
   )

   useEffect(() => {
      postLikes.map((like) => {
         // Itt a későbbiekben lehet kategóriánként (isLike, isAngry etc) kiszedni,
         // hogy hány darab, majd azt összesíteni, (össz likeok száma)
         if (userId === like.userId) {
            const likeType = Object.keys(like.reactionType).filter(
               (key) => like.reactionType[key]
            )[0] as LikeTypes
            handleSetLikeAndButtonColor(likeType)
         }
      })
   }, [postLikes])

   return (
      <>
         {/* <p>likeok száma: {postLikes.length}</p> */}
         <CustomTooltipTitle placement='top' title={<Reactions setLike={handleSendPostLike} />}>
            {isPostLike ? (
               <Button
                  sx={{ color: likeButtonColor, textTransform: 'none' }}
                  disableRipple
                  onClick={handleLikeBtnClick}
                  fullWidth
                  startIcon={likeBtnIcon}>
                  {likeBtnText}
               </Button>
            ) : (
               <StyledCommentLikeButton onClick={handleLikeBtnClick} style={{ color: likeButtonColor }}>
                  like
               </StyledCommentLikeButton>
            )}
         </CustomTooltipTitle>
         {children}
      </>
   )
}

export default Like
