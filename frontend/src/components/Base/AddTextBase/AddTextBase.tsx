import React from 'react'

import Tooltip from '@mui/material/Tooltip'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'

import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'
import AddEmojiButton from '@/Base/EmojiPicker/AddEmojiButton'

import { StyledPaperContainer, StyledTextInput, StyledTextContainer } from './Styles'

const AddTextBase: React.FC<{
   value: string
   isSendBtnDisabled?: boolean
   reference?: React.MutableRefObject<HTMLTextAreaElement | undefined>
   tooltipTitle?: string
   placeholderText?: string
   multiline?: boolean
   handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
   handleChangeValueWithEmoji: (emoji?: string) => void
   setImagePath: (event: React.ChangeEvent<HTMLInputElement>) => void
   onClickFunction: (anyArgument: any) => void
   onKeyEnterFunction?: (anyArgument: any) => void
}> = ({
   handleChangeValue,
   handleChangeValueWithEmoji,
   onClickFunction,
   onKeyEnterFunction,
   setImagePath,
   value,
   reference,
   multiline = true,
   tooltipTitle = 'Küldés',
   isSendBtnDisabled = false,
   placeholderText = 'Hozzászólás írása...',
}) => {
   return (
      <StyledPaperContainer isAddPostComment={true}>
         <StyledTextContainer>
            <StyledTextInput
               value={value}
               inputRef={reference}
               onChange={handleChangeValue}
               onKeyDown={onKeyEnterFunction}
               id='chat-comment-input'
               name='chat-comment-input'
               placeholder={placeholderText}
               multiline={multiline}
               maxRows={4}
               variant='standard'
               fullWidth
            />
            <ImageSelector addPictures={setImagePath} maxFileCount={1} multiple={false} size='small' />
            <AddEmojiButton handleChangeTextWithEmoji={handleChangeValueWithEmoji} />
            <Tooltip title={tooltipTitle} placement='top' arrow>
               <span>
                  <IconButton
                     sx={{
                        color: 'primary.main',
                     }}
                     disabled={isSendBtnDisabled}
                     onClick={onClickFunction}
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
   )
}

export default AddTextBase
