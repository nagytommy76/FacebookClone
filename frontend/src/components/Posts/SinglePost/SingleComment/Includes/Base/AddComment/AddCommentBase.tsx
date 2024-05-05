import React, { useEffect } from 'react'

import DisplayCommentImage from './Includes/DisplayCommentImage'
import AddTextBase from '@/Base/AddTextBase/AddTextBase'
import useAddCommentSocket from './Hooks/useAddCommentSocket'

const AddCommentBase: React.FC<{
   handleSendCommentAnswer: () => void
   updateCommentMutate: () => void
   handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
   handleUpdateCommentAnswerMutate: () => void
   handleChangeTextWithEmoji: (emoji?: string) => void
   handleAddSinglePostComment: () => void
   addSingleImagePath: (event: React.ChangeEvent<HTMLInputElement>) => void
   setCommentImagePath: React.Dispatch<React.SetStateAction<FileList | null>>
   commentImagePath: FileList | null
   reference: React.MutableRefObject<HTMLTextAreaElement | undefined>
   commentText: string
   isUpdate: boolean
   isSendDisabled?: boolean
   isChildComment?: boolean
   isAddPostComment?: boolean
}> = ({
   handleAddSinglePostComment,
   handleUpdateCommentAnswerMutate,
   handleSendCommentAnswer,
   updateCommentMutate,
   handleChangeText,
   handleChangeTextWithEmoji,
   addSingleImagePath,
   setCommentImagePath,
   commentImagePath,
   reference,
   commentText,
   isSendDisabled,
   isUpdate = false,
   isChildComment = false,
   isAddPostComment = false,
}) => {
   useAddCommentSocket()
   const handleClick = () => {
      if (isChildComment) {
         isUpdate ? handleUpdateCommentAnswerMutate() : handleSendCommentAnswer()
      } else {
         isUpdate
            ? updateCommentMutate()
            : isAddPostComment
            ? handleAddSinglePostComment()
            : handleSendCommentAnswer()
      }
   }

   useEffect(() => {
      if (reference.current) {
         reference.current.focus()
      }
   }, [reference])

   return (
      <>
         <AddTextBase
            value={commentText}
            reference={reference}
            isSendBtnDisabled={isSendDisabled}
            tooltipTitle={isUpdate ? 'Módosítás' : 'Küldés'}
            onClickFunction={handleClick}
            handleChangeValue={handleChangeText}
            handleChangeValueWithEmoji={handleChangeTextWithEmoji}
            setImagePath={addSingleImagePath}
         />
         {commentImagePath && (
            <DisplayCommentImage
               setCommentImagePath={setCommentImagePath}
               commentImagePath={commentImagePath}
            />
         )}
      </>
   )
}

export default AddCommentBase
