import React from 'react'
import useCommentLikeIcons from '../Hooks/useCommentLikeIcons'
import { IconStackStyle } from '../Styles'
import type { IOrderedLikesCount } from '../../Like/Types'

const IconStack: React.FC<{ orderedCountedLike: IOrderedLikesCount | null }> = ({ orderedCountedLike }) => {
   if (!orderedCountedLike) return <></>
   const getLikeIconComponent = useCommentLikeIcons()
   return (
      <IconStackStyle>
         {Object.entries(orderedCountedLike).map(
            (likeType, index) =>
               likeType[1] > 0 &&
               index <= 2 && <span key={index}>{getLikeIconComponent(likeType[0] as any)}</span>
         )}
      </IconStackStyle>
   )
}

export default IconStack
