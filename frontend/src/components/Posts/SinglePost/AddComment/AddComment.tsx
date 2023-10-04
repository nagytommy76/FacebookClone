import React from 'react'
import useAddComment from './Hook/useAddComment'

import AddCommentBase from '../SingleComment/Includes/Base/AddComment/AddCommentBase'

const AddComment: React.FC<{
   reference: React.MutableRefObject<null>
   postId: string
}> = ({ reference, postId }) => {
   const { commentText, isSendDisabled, handleChangeText, handleSendComment, handleChangeTextWithEmoji } =
      useAddComment(postId)
   return (
      <>
         <AddCommentBase
            reference={reference}
            commentText={commentText}
            isSendDisabled={isSendDisabled}
            isUpdate={false}
            isAddPostComment={true}
            handleChangeTextWithEmoji={handleChangeTextWithEmoji}
            handleChangeText={handleChangeText}
            handleAddSinglePostComment={handleSendComment}
            updateCommentMutate={() => {}}
            commentAnswerId=''
            handleSendCommentAnswer={() => {}}
            handleUpdateCommentAnswerMutate={() => {}}
         />
      </>
   )
}

export default AddComment
