import React, { useEffect } from 'react'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SendIcon from '@mui/icons-material/Send'

import AddEmojiButton from '@/Base/EmojiPicker/AddEmojiButton'
import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'
import DisplayCommentImage from './Includes/DisplayCommentImage'

import useAddCommentSocket from './Hooks/useAddCommentSocket'

const AddCommentBase: React.FC<{
   handleSendCommentAnswer: () => void
   updateCommentMutate: () => void
   handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
   handleUpdateCommentAnswerMutate: () => void
   handleChangeTextWithEmoji: (emoji?: string) => void
   handleAddSinglePostComment: () => void
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
   }, [])

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
               <ImageSelector
                  addPictures={(event) => setCommentImagePath(event.target.files)}
                  maxFileCount={1}
                  multiple={false}
                  size='small'
               />
               <AddEmojiButton handleChangeTextWithEmoji={handleChangeTextWithEmoji} />
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
