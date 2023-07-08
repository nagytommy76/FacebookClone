import React, { useState } from 'react'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import Collapse from '@mui/material/Collapse'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const AddCommentBase: React.FC<{
   reference: React.MutableRefObject<null>
   handleSendComment: () => void
   handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
   commentText: string
   isSendDisabled?: boolean
}> = ({ reference, handleSendComment, commentText, handleChangeText, isSendDisabled }) => {
   return (
      <>
         <Collapse orientation='vertical' in={true}>
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
                     maxRows={3}
                     variant='standard'
                     fullWidth
                  />
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
         </Collapse>
      </>
   )
}

export default AddCommentBase