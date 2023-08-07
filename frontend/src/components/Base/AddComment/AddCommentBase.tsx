import React from 'react'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SendIcon from '@mui/icons-material/Send'

import AddEmojiButton from './Includes/AddEmojiButton'

const AddCommentBase: React.FC<{
   reference: React.MutableRefObject<null>
   handleSendComment: () => void
   handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
   commentText: string
   isSendDisabled?: boolean
}> = ({ reference, handleSendComment, commentText, handleChangeText, isSendDisabled }) => {
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
               <Tooltip title='Küldés' placement='top' arrow>
                  <span>
                     <IconButton
                        sx={{
                           color: 'primary.main',
                           ...(isSendDisabled && {
                              cursor: 'not-allowed',
                           }),
                        }}
                        disabled={isSendDisabled}
                        onClick={handleSendComment}
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
