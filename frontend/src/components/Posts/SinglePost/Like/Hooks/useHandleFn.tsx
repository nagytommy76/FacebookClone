import { useState, useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'
import useLikeMutate from './useLikeMutate'
import useLikeComment from './useLikeComment'
import useLikeAnswer from './useLikeAnswer'
import useLikeDelete from './useLikeDelete'
import useLikeCommentDelete from './useLikeCommentDelete'
import type { LikeTypes } from '@/types/LikeTypes'

const useHandleFn = (
   setButtonColor: (currentLikeType: LikeTypes | undefined) => void,
   postId: string,
   isChildComment: boolean,
   commentId?: string
) => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)
   const { mutatePostLike } = useLikeMutate()
   const { mutateCommentLike } = useLikeComment()
   const { mutateAnswerLike } = useLikeAnswer()
   const { deleteMutation } = useLikeDelete()
   const { deleteCommentLikeMutation } = useLikeCommentDelete()

   const [like, setLike] = useState<LikeTypes | undefined>(undefined)
   const [likeIdToDelete, setLikeIdToDelete] = useState<string>('')

   const handleUnsetLike = () => {
      // ide egy remove post like mutate kell
      setButtonColor(undefined)
      setLike(undefined)
      deleteMutation(postId)
   }

   const handleUnsetCommentLike = () => {
      setButtonColor(undefined)
      setLike(undefined)
      deleteCommentLikeMutation({ postId, commentId, likeIdToDelete })
   }

   const handleLikeBtnClick = () => {
      if (like === undefined) handleSendPostLike('isLike')
      else handleUnsetLike()
   }

   const handleCommentLikeBtnClick = () => {
      if (like === undefined) handleSendCommentLike('isLike')
      else handleUnsetCommentLike()
   }
   // Ez a likeolás esetén fut le
   const handleCommentAnswerLikeClick = () => {
      console.log('Likeolom a választ')
      if (like === undefined) handleSendAnswerLike('isLike')
   }

   const handleSetLikeAndButtonColor = (likeType: LikeTypes) => {
      // Ide majd egy usemutation jön, illetve controlled close a tooltipre
      // A gombot pedig a like típusa szerint animálni!
      setButtonColor(likeType)
      setLike(likeType)
   }

   const handleSendAnswerLike = (likeType: LikeTypes) => {
      console.log(singleComment._id)
      handleSetLikeAndButtonColor(likeType)
      mutateAnswerLike({
         commentId: singleComment._id,
         postId,
         commentAnswerId: commentId,
         reactionType: likeType,
      })
      console.log(commentId)
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
      handleSetLikeAndButtonColor,
      setLikeIdToDelete,
      handleCommentLikeBtnClick,
      handleCommentAnswerLikeClick,
      handleSendPostLike,
      handleSendCommentLike,
      handleSendAnswerLike,
   }
}

export default useHandleFn
