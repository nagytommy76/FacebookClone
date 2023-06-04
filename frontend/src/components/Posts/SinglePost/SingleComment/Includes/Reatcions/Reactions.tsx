import React from 'react'
import useGetLikeTypes from '../../Hooks/useGetLikeTypes'
import type { IPostLike } from '../../../Like/Types'

import Tooltip from '@mui/material/Tooltip'
import { LikeIconStyle, LikeLengthStyle } from './Styles'

import IconStack from '../IconStack'

const Reactions: React.FC<{ likes: IPostLike[] }> = ({ likes }) => {
   const orderedCountedLike = useGetLikeTypes(likes)
   return orderedCountedLike ? (
      <Tooltip title={<IconStack displayRow={false} orderedCountedLike={orderedCountedLike} />}>
         <LikeIconStyle>
            <IconStack orderedCountedLike={orderedCountedLike} />
            <LikeLengthStyle variant='caption'>{likes.length}</LikeLengthStyle>
         </LikeIconStyle>
      </Tooltip>
   ) : (
      <></>
   )
}

export default Reactions
