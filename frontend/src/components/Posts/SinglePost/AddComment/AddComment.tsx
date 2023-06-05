import React, { useState, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '../../../../utils/axiosSetup/AxiosInstance'
import type { IPostComment } from '../Like/Types'

import { PostContext } from '../../../MainPage/Context/PostContextProvider'
import { PostsActions } from '../../../MainPage/Context/PostReducer'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import Collapse from '@mui/material/Collapse'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const AddComment: React.FC<{
   reference: React.MutableRefObject<null>
   postId: string
}> = ({ reference, postId }) => {
   const { postsDispatch } = useContext(PostContext)
   const [commentText, setCommentText] = useState<string>('')
   const { mutate } = useMutation({
      mutationKey: ['sendPostComment'],
      mutationFn: async () => {
         const response = (await axios.post('/post/post-comment-add', {
            comment: commentText,
            postId,
         })) as AxiosResponse<{ comments: IPostComment[] }>
         return response.data
      },
      onSuccess: (data) => {
         postsDispatch({ type: PostsActions.ADD_NEW_COMMENT, payload: data.comments })
      },
   })

   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCommentText(event.target.value)
   }

   const handleSendComment = () => {
      mutate()
      console.log(commentText)
   }

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
                     <IconButton
                        onClick={handleSendComment}
                        type='submit'
                        sx={{ color: 'primary.main' }}
                        size='small'
                        aria-label='send-comment'>
                        <SendIcon fontSize='inherit' />
                     </IconButton>
                  </Tooltip>
               </StyledTextContainer>
            </StyledPaperContainer>
         </Collapse>
      </>
   )
}

export default AddComment
