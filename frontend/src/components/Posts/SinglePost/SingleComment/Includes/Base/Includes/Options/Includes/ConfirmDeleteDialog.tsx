import React, { useContext } from 'react'
import { CommentContext } from '../../../../../Context/Comment/CommentContext'

import useRemoveComment from '../Hooks/useRemoveComment'
import useRemoveAnswer from '../Hooks/useRemoveAnswer'

import ConfirmDelete from '@/Base/ConfirmDelete/ConfirmDelete'

const ConfirmDeleteDialog: React.FC<{
   isOpen: boolean
   commentId: string
   isChildComment: boolean
   setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, commentId, isChildComment, setIsDialogOpen }) => {
   const mutateRemoveComment = useRemoveComment()
   const mutateRemoveCommentAnswer = useRemoveAnswer()
   const {
      commentReducer: {
         postId,
         singleComment: { answeredAt },
      },
   } = useContext(CommentContext)

   const handleCloseAndDelete = () => {
      if (!isChildComment) mutateRemoveComment({ commentId, postId })
      else mutateRemoveCommentAnswer({ answerId: commentId, postId })
      setIsDialogOpen(false)
   }

   return (
      <ConfirmDelete
         isOpen={isOpen}
         createdAt={answeredAt}
         postOrCommentText='hozzászólás'
         handleCloseAndDelete={handleCloseAndDelete}
         setIsDialogOpen={setIsDialogOpen}
      />
   )
}

export default ConfirmDeleteDialog
