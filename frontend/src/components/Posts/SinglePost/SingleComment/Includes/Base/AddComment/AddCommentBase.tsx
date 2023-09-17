import React from 'react'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SendIcon from '@mui/icons-material/Send'

import AddEmojiButton from './Includes/AddEmojiButton'

const AddCommentBase: React.FC<{
   handleSendCommentAnswer: () => void
   updateCommentMutate: () => void
   handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
   handleUpdateCommentAnswerMutate: (answerId: string) => void
   handleAddSinglePostComment: () => void
   commentAnswerId: string
   reference: React.MutableRefObject<null>
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
   commentAnswerId,
   reference,
   commentText,
   isSendDisabled,
   isUpdate = false,
   isChildComment = false,
   isAddPostComment = false,
}) => {
   const handleClick = () => {
      if (isChildComment) {
         isUpdate ? handleUpdateCommentAnswerMutate(commentAnswerId) : handleSendCommentAnswer()
      } else {
         isUpdate
            ? updateCommentMutate()
            : isAddPostComment
            ? handleAddSinglePostComment()
            : handleSendCommentAnswer()
      }
   }

   return (
      <>
         <StyledPaperContainer isAddPostComment={isAddPostComment}>
            <StyledTextContainer>
               <StyledTextInput
                  value={commentText}
                  inputRef={reference}
                  onChange={handleChangeText}
                  id='comment-text'
                  name='comment'
                  placeholder='Hozzászólás írása...'
                  multiline
                  maxRows={4}
                  variant='standard'
                  fullWidth
               />
               <AddEmojiButton />
               <Tooltip title={isUpdate ? 'Módosítás' : 'Küldés'} placement='top' arrow>
                  <span>
                     <IconButton
                        sx={{
                           color: 'primary.main',
                           ...(isSendDisabled && {
                              cursor: 'not-allowed',
                           }),
                        }}
                        disabled={isSendDisabled}
                        onClick={handleClick}
                        type='submit'
                        size='small'
                        aria-label='send-comment'
                     >
                        <SendIcon fontSize='inherit' />
                     </IconButton>
                  </span>
               </Tooltip>
            </StyledTextContainer>
         </StyledPaperContainer>
      </>
   )
}

export default AddCommentBase
