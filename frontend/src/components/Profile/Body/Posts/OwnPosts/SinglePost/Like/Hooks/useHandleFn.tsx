import { useState } from 'react'
import useLikeMutate from './useLikeMutate'
import useLikeDelete from './useLikeDelete'
import type { LikeTypes } from '../../../Types'

const useHandleFn = (setButtonColor: (currentLikeType: LikeTypes | undefined) => void, postId: string) => {
   const { mutatePostLike } = useLikeMutate()
   const { deleteMutation } = useLikeDelete()
   const [like, setLike] = useState<LikeTypes | undefined>(undefined)

   const handleUnsetLike = () => {
      // ide egy remove post like mutate kell
      setButtonColor(undefined)
      setLike(undefined)
      deleteMutation(postId)
   }
   const handleLikeBtnClick = () => {
      if (like === undefined) handleSendPostLike('isLike')
      else handleUnsetLike()
   }

   const handleSetLikeAndButtonColor = (likeType: LikeTypes) => {
      // Ide majd egy usemutation jön, illetve controlled close a tooltipre
      // A gombot pedig a like típusa szerint animálni!
      setButtonColor(likeType)
      setLike(likeType)
   }

   const handleSendPostLike = (likeType: LikeTypes) => {
      handleSetLikeAndButtonColor(likeType)
      mutatePostLike({ likeTypeFomInput: likeType, postId })
   }

   return {
      handleLikeBtnClick,
      handleSendPostLike,
      handleSetLikeAndButtonColor,
   }
}

export default useHandleFn
