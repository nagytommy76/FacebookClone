import React from 'react'
import useGetLikeTypes from '../../Hooks/useGetLikeTypes'
import type { IPostLike } from '../../../Like/Types'

import Tooltip from '@mui/material/Tooltip'
import { LikeIconStyle, LikeLengthStyle, PostLikeIconStyle } from './Styles'

import IconStack from '../IconStack'

const Reactions: React.FC<{ likes: IPostLike[]; isPostReactions?: boolean }> = ({
   likes,
   isPostReactions = false,
}) => {
   const orderedCountedLike = useGetLikeTypes(likes)
   return orderedCountedLike ? (
      <Tooltip title={<IconStack displayRow={false} orderedCountedLike={orderedCountedLike} />}>
         {!isPostReactions ? (
            <LikeIconStyle>
               <IconStack orderedCountedLike={orderedCountedLike} />
               <LikeLengthStyle variant='caption'>{likes.length}</LikeLengthStyle>
            </LikeIconStyle>
         ) : (
            <PostLikeIconStyle>
               <IconStack orderedCountedLike={orderedCountedLike} />
               <LikeLengthStyle variant='caption'>{likes.length}</LikeLengthStyle>
            </PostLikeIconStyle>
         )}
      </Tooltip>
   ) : (
      <></>
   )
}

export default Reactions
