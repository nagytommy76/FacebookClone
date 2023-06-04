import React from 'react'
import useCommentLikeIcons from '../Hooks/useCommentLikeIcons'
import type { IOrderedLikesCount } from '../../Like/Types'

import { IconStackStyle } from '../Includes/Reatcions/Styles'
import { IconStackContainerStyle } from '../Styles'
import Typography from '@mui/material/Typography'

const IconStack: React.FC<{ orderedCountedLike: IOrderedLikesCount | null; displayRow?: boolean }> = ({
   orderedCountedLike,
   displayRow = true,
}) => {
   if (!orderedCountedLike) return <></>
   const getLikeIconComponent = useCommentLikeIcons()
   return displayRow ? (
      <>
         {Object.entries(orderedCountedLike).map(
            (likeType, index) =>
               likeType[1] > 0 &&
               index <= 2 && <span key={index}>{getLikeIconComponent(likeType[0] as any)}</span>
         )}
      </>
   ) : (
      <IconStackContainerStyle>
         {Object.entries(orderedCountedLike).map(
            (likeType, index) =>
               likeType[1] > 0 && (
                  <IconStackStyle key={index}>
                     {getLikeIconComponent(likeType[0] as any)}{' '}
                     <Typography variant='caption'>{likeType[1]}</Typography>
                  </IconStackStyle>
               )
         )}
      </IconStackContainerStyle>
   )
}

export default IconStack
