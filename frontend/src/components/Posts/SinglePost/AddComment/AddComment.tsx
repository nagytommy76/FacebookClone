import React from 'react'
import useAddComment from './Hook/useAddComment'

import AddCommentBase from '../SingleComment/Includes/Base/AddComment/AddCommentBase'

const AddComment: React.FC<{
   reference: React.MutableRefObject<HTMLTextAreaElement | undefined>
}> = ({ reference }) => {
   const {
      commentText,
      isSendDisabled,
      commentImagePath,
      addSingleImagePath,
      setCommentImagePath,
      handleChangeText,
      handleSendComment,
      handleChangeTextWithEmoji,
   } = useAddComment(reference)
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
            addSingleImagePath={addSingleImagePath}
            setCommentImagePath={setCommentImagePath}
            commentImagePath={commentImagePath}
            updateCommentMutate={() => {}}
            handleSendCommentAnswer={() => {}}
            handleUpdateCommentAnswerMutate={() => {}}
         />
      </>
   )
}

export default AddComment
