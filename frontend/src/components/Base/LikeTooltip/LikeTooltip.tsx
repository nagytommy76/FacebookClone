import React from 'react'

import CustomTooltipTitle from './CustomTooltipTitle'
import Reactions from './Reactions'
import { LikeTypes } from '@/types/LikeTypes'

const LikeTooltip: React.FC<{
   setLikeFunction: (likeType: LikeTypes) => void
   LikeCommentButtonComponent: React.ReactElement
}> = ({ setLikeFunction, LikeCommentButtonComponent }) => {
   return (
      <CustomTooltipTitle placement='top' title={<Reactions setLike={setLikeFunction} />}>
         {LikeCommentButtonComponent}
      </CustomTooltipTitle>
   )
}

export default LikeTooltip
