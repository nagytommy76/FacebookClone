import React from 'react'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SendIcon from '@mui/icons-material/Send'

import AddEmojiButton from './Includes/AddEmojiButton'

const AddCommentBase: React.FC<{
   handleSendComment: () => void
   updateCommentMutate: () => void
   handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
   handleUpdateCommentAnswerMutate: (answerId: string) => void
   commentAnswerId: string
   reference: React.MutableRefObject<null>
   commentText: string
   isSendDisabled?: boolean
   isChildComment?: boolean
   isUpdate: boolean
}> = ({
   handleUpdateCommentAnswerMutate,
   handleSendComment,
   updateCommentMutate,
   handleChangeText,
   commentAnswerId,
   reference,
   commentText,
   isSendDisabled,
   isUpdate = false,
   isChildComment = false,
}) => {
   const handleClick = () => {
      console.log(isChildComment, isUpdate)
      if (isChildComment) {
         isUpdate ? handleUpdateCommentAnswerMutate(commentAnswerId) : () => {}
      } else {
         isUpdate ? updateCommentMutate() : handleSendComment()
      }
   }

   return (
      <>
         <StyledPaperContainer>
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
