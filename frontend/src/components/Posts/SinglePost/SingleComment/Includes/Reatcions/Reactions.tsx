import React, { memo } from 'react'
import useGetLikeTypes from '../../Hooks/useGetLikeTypes'
import type { IPostLike } from '../../../Like/Types'

import Tooltip from '@mui/material/Tooltip'
import { LikeIconStyle, LikeLengthStyle, PostLikeIconStyle } from './Styles'

import IconStack from '../IconStack'

const Reactions = memo(function Reactions({
   likes,
   isPostReactions = false,
}: {
   likes: IPostLike[]
   isPostReactions?: boolean
}) {
   const orderedCountedLike = useGetLikeTypes(likes)

   const IconAndLength = () => {
      return (
         <>
            <IconStack orderedCountedLike={orderedCountedLike} />
            <LikeLengthStyle variant='caption'>{likes.length}</LikeLengthStyle>
         </>
      )
   }
   return orderedCountedLike ? (
      <Tooltip title={<IconStack displayRow={false} orderedCountedLike={orderedCountedLike} />}>
         {!isPostReactions ? (
            <LikeIconStyle>
               <IconAndLength />
            </LikeIconStyle>
         ) : (
            <PostLikeIconStyle>
               <IconAndLength />
            </PostLikeIconStyle>
         )}
      </Tooltip>
   ) : (
      <></>
   )
})

export default Reactions
