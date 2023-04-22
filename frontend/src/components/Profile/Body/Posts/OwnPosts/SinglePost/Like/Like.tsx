import React, { useState } from 'react'

import Button from '@mui/material/Button'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { CustomTooltipTitle, ButtonGroupStyle } from './Styles'

import Reactions from './Reactions'
import type { LikeTypes } from '../../Types'

const Like = () => {
   const [like, setLike] = useState<LikeTypes | undefined>(undefined)
   const handleSetLike = (likeType: LikeTypes) => {
      // Ide majd egy usemutation jön, illetve controlled close a tooltipre
      // A gombot pedig a like típusa szerint animálni!
      console.log(likeType)
      setLike(likeType)
   }

   return (
      <ButtonGroupStyle>
         <CustomTooltipTitle placement='top' title={<Reactions setLike={handleSetLike} />}>
            <Button fullWidth startIcon={<ThumbUpOffAltIcon />}>
               Like
            </Button>
         </CustomTooltipTitle>
         <Button fullWidth startIcon={<ChatBubbleOutlineIcon />}>
            Hozzászólás
         </Button>
      </ButtonGroupStyle>
   )
}

export default Like
