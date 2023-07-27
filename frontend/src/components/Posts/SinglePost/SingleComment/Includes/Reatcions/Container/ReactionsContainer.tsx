import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import useGetPostLike from '../../Hooks/useGetPostLike'

const LikeModal = dynamic(() => import('../LikeModal/LikeModal'))
import Reactions from '../Reactions'
import { IPostLike } from '@/src/types/LikeTypes'

const ReactionsContainer: React.FC<{ postId: string; likes: IPostLike[] }> = ({ likes, postId }) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const { postLikeCount, isLoading } = useGetPostLike(postId, isModalOpen)

   return (
      <>
         <Reactions isPostReactions={true} likes={likes} setIsModalOpen={setIsModalOpen}>
            <LikeModal
               likeCount={postLikeCount?.data}
               isModalOpen={isModalOpen}
               setIsModalOpen={setIsModalOpen}
            />
         </Reactions>
      </>
   )
}

export default ReactionsContainer
