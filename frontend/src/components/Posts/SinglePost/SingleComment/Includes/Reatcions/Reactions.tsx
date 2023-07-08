import dynamic from 'next/dynamic'
import React, { memo, useState } from 'react'
import useGetLikeTypes from '../../Hooks/useGetLikeTypes'
import type { IPostLike } from '@/types/LikeTypes'

import Tooltip from '@mui/material/Tooltip'
import { LikeIconStyle, LikeLengthStyle, PostLikeIconStyle } from './Styles'

import IconStack from '../IconStack'
const LikeModal = dynamic(() => import('./LikeModal/LikeModal'))

const Reactions = memo(function Reactions({
   likes,
   isPostReactions = false,
}: {
   likes: IPostLike[]
   isPostReactions?: boolean
}) {
   const orderedCountedLike = useGetLikeTypes(likes)
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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
            onClick={() => setIsModalOpen(true)}
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
         <LikeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </>
   ) : (
      <></>
   )
})

export default Reactions
