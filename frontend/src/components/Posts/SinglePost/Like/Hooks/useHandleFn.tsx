import { useState, useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'
import useLikeMutate from './useLikeMutate'
import useLikeComment from './useLikeComment'
import useLikeAnswer from './useLikeAnswer'
import useLikeDelete from './delete/useLikeDelete'
import useLikeCommentDelete from './delete/useLikeCommentDelete'
import useAnswerLikeDelete from './delete/useAnswerLikeDelete'
import type { LikeTypes } from '@/types/LikeTypes'

// A commentId az lehet answerId is
const useHandleFn = (
   setButtonColor: (currentLikeType: LikeTypes | undefined) => void,
   postId: string,
   commentId: string
) => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)
   const { mutatePostLike } = useLikeMutate()
   const { mutateCommentLike } = useLikeComment()
   const { mutateAnswerLike } = useLikeAnswer()
   const { deleteMutation } = useLikeDelete()
   const { deleteCommentLikeMutation } = useLikeCommentDelete()
   const { deleteAnswerLikeMutation } = useAnswerLikeDelete()

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

   const handleUnsetAnswerLike = () => {
      setButtonColor(undefined)
      setLike(undefined)
      deleteAnswerLikeMutation({
         likeIdToDelete,
         answerId: commentId, // ebben az esetben az answerId kapom meg mert a childAnswer-en nyomtam a like-ot
         commentId: singleComment._id,
         postId,
      })
   }

   // Ez a likeolás esetén fut le
   const handleCommentAnswerLikeClick = () => {
      if (like === undefined) handleSendAnswerLike('isLike')
      else handleUnsetAnswerLike()
   }

   const handleSetLikeAndButtonColor = (likeType: LikeTypes) => {
      // Ide majd egy usemutation jön, illetve controlled close a tooltipre
      // A gombot pedig a like típusa szerint animálni!
      setButtonColor(likeType)
      setLike(likeType)
   }

   const handleSendAnswerLike = (likeType: LikeTypes) => {
      handleSetLikeAndButtonColor(likeType)
      mutateAnswerLike({
         commentId: singleComment._id,
         postId,
         commentAnswerId: commentId,
         reactionType: likeType,
      })
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
