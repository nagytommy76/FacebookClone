import dynamic from 'next/dynamic'
import { useState } from 'react'
import useGetReactionCount from './Hook/useGetReactionCount'
import type { ILike } from '@/src/types/LikeTypes'

const LikeModal = dynamic(() => import('@/Base/LikeReactions/LikeModal/LikeModal'))
const Reactions = dynamic(() => import('@/Base/LikeReactions/Reactions'))

const MsgReactionModal: React.FC<{ reactions: ILike[]; messageId: string }> = ({ reactions, messageId }) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const likeCount = useGetReactionCount(messageId, isModalOpen)
   return (
      <>
         {reactions.length !== 0 && (
            <Reactions setIsModalOpen={() => setIsModalOpen(true)} likes={reactions}>
               <LikeModal isModalOpen={isModalOpen} likeCount={likeCount} setIsModalOpen={setIsModalOpen} />
            </Reactions>
         )}
      </>
   )
}

export default MsgReactionModal
