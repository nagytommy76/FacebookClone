import { useState } from 'react'
import useLikeMutate from './useLikeMutate'
import useLikeDelete from './useLikeDelete'
import useLikeComment from './useLikeComment'
import type { LikeTypes } from '../Types'

const useHandleFn = (
   setButtonColor: (currentLikeType: LikeTypes | undefined) => void,
   postId: string,
   commentId?: string
) => {
   const { mutatePostLike } = useLikeMutate()
   const { deleteMutation } = useLikeDelete()
   const { mutateCommentLike } = useLikeComment()
   const [like, setLike] = useState<LikeTypes | undefined>(undefined)

   const handleUnsetLike = () => {
      // ide egy remove post like mutate kell
      setButtonColor(undefined)
      setLike(undefined)
      deleteMutation(postId)
   }

   const handleUnsetCommentLike = () => {
      setButtonColor(undefined)
      setLike(undefined)
      console.log('Ide egy handleUnsetCommentLike function kell és egy deleteCommentMutation')
   }

   const handleLikeBtnClick = () => {
      if (like === undefined) handleSendPostLike('isLike')
      else handleUnsetLike()
   }

   const handleCommentLikeBtnClick = () => {
      if (like === undefined) handleSendCommentLike('isLike')
      else handleUnsetCommentLike()
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

   const handleSendCommentLike = (likeType: LikeTypes) => {
      handleSetLikeAndButtonColor(likeType)
      mutateCommentLike({ likeTypeFomInput: likeType, postId, commentId })
   }

   return {
      handleLikeBtnClick,
      handleCommentLikeBtnClick,
      handleSendPostLike,
      handleSendCommentLike,
      handleSetLikeAndButtonColor,
   }
}

export default useHandleFn
