import React, { useState } from 'react'
import useLikeMutate from './Hooks/useLikeMutate'
import useButtonColor from './Hooks/useButtonColor'

import Button from '@mui/material/Button'

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { CustomTooltipTitle, ButtonGroupStyle } from './Styles'

import Reactions from './Reactions'
import type { LikeTypes } from '../../Types'

const Like: React.FC<{ postId: string }> = ({ postId }) => {
   const { likeBtnIcon, likeButtonColor, likeBtnText, setButtonColor } = useButtonColor()
   const { mutatePostLike } = useLikeMutate()
   const [like, setLike] = useState<LikeTypes | undefined>(undefined)

   const handleLikeBtnClick = () => {
      if (like === undefined) handleSetLike('isLike')
      else handleUnsetLike()
   }

   const handleSetLike = (likeType: LikeTypes) => {
      // Ide majd egy usemutation jön, illetve controlled close a tooltipre
      // A gombot pedig a like típusa szerint animálni!
      setButtonColor(likeType)
      setLike(likeType)
      mutatePostLike({ likeTypeFomInput: likeType, postId })
   }

   const handleUnsetLike = () => {
      // ide egy remove post like mutate kell
      setButtonColor(undefined)
      setLike(undefined)
   }

   return (
      <ButtonGroupStyle>
         <CustomTooltipTitle placement='top' title={<Reactions setLike={handleSetLike} />}>
            <Button
               sx={{ color: likeButtonColor, textTransform: 'none' }}
               disableRipple
               onClick={handleLikeBtnClick}
               fullWidth
               startIcon={likeBtnIcon}>
               {likeBtnText}
            </Button>
         </CustomTooltipTitle>
         <Button disableRipple fullWidth startIcon={<ChatBubbleOutlineIcon />}>
            Hozzászólás
         </Button>
      </ButtonGroupStyle>
   )
}

export default Like
