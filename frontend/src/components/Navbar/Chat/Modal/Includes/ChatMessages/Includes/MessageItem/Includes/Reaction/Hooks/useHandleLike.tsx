import useMutateLike from './useMutateLike'
import useDeleteLike from './useDeleteLike'
import useGetUsersLikeId from '@/hooks/Like/useGetUsersLikeId'

import type { ILike, LikeTypes } from '@/types/LikeTypes'

const useHandleLike = (messageId: string, reactions: ILike[]) => {
   const { likeIdToDelete, like, setLike } = useGetUsersLikeId(() => {}, reactions)
   const deleteLikeMutate = useDeleteLike(messageId, likeIdToDelete, setLike)
   const { handleLikeMutate } = useMutateLike(messageId)

   const handleLikeOrDelete = (likeType: LikeTypes) => {
      // Itt kéne törölnöm a likeot ha ugyan arra a reakció iconra kattintok, ha a like !== undefined.
      if (like === undefined || like !== likeType) {
         handleLikeMutate(likeType)
      } else if (like === likeType) {
         // Itt törlök
         deleteLikeMutate()
      }
   }

   return { handleLikeOrDelete, like }
}

export default useHandleLike
