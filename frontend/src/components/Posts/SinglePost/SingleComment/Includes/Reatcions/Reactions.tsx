import React, { memo } from 'react'
import useGetLikeTypes from '../../Hooks/useGetLikeTypes'
import type { IPostLike } from '@/types/LikeTypes'

import Tooltip from '@mui/material/Tooltip'
import { LikeIconStyle, LikeLengthStyle, PostLikeIconStyle } from './Styles'

import IconStack from '../IconStack'

const Reactions = memo(function Reactions({
   children,
   likes,
   isPostReactions = false,
   setIsModalOpen,
}: {
   children: React.ReactNode
   likes: IPostLike[]
   isPostReactions?: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
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
      <>
         <Tooltip
            title={<IconStack displayRow={false} orderedCountedLike={orderedCountedLike} />}
            onClick={() => {
               setIsModalOpen(true)
            }}
         >
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
         {children}
      </>
   ) : (
      <></>
   )
})

export default Reactions
