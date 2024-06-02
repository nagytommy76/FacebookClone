import { useState, useEffect, useCallback } from 'react'
import { useAppSelector } from '@/src/utils/redux/store'

import type { ILike, LikeTypes } from '@/src/types/LikeTypes'

const useGetUsersLikeId = (
   setButtonColor: (currentLikeType: LikeTypes | undefined) => void,
   likes: ILike[]
) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const [likeIdToDelete, setLikeIdToDelete] = useState<string>('')
   const [like, setLike] = useState<LikeTypes | undefined>(undefined)

   const handleSetLikeAndButtonColor = useCallback(
      (likeType: LikeTypes) => {
         // Ide majd egy usemutation jön, illetve controlled close a tooltipre
         // A gombot pedig a like típusa szerint animálni!
         setButtonColor(likeType)
         setLike(likeType)
      },
      [setButtonColor]
   )

   useEffect(() => {
      likes.map((like) => {
         // Itt kiválasztom, hogy a belépett user mit nyomott (isLike, isAngry stb...)
         if (userId === like.userId) {
            setLikeIdToDelete(like._id)
            const likeType = Object.keys(like.reactionType).filter(
               (key) => like.reactionType[key]
            )[0] as LikeTypes
            handleSetLikeAndButtonColor(likeType)
         }
      })
   }, [likes, userId, handleSetLikeAndButtonColor])

   return { likeIdToDelete, like, setLike }
}

export default useGetUsersLikeId
