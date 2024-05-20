import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import useGetPostLike from '../../../Posts/SinglePost/SingleComment/Includes/Hooks/useGetPostLike'

const LikeModal = dynamic(() => import('../LikeModal/LikeModal'))
import Reactions from '../Reactions'
import { ILike } from '@/src/types/LikeTypes'

const ReactionsContainer: React.FC<{ postId: string; likes: ILike[] }> = ({ likes, postId }) => {
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
