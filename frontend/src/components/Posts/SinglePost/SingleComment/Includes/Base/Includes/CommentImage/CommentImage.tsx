import { useContext } from 'react'
import { CommentContext } from '../../../../Context/CommentContext'

import { StyledCommentImg, StyledCommentImgContainer, IconButtonStyle } from './Styles'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const CommentImage: React.FC<{ commentImage: string | null; isUpdateActive?: boolean }> = ({
   commentImage,
   isUpdateActive = false,
}) => {
   const { commentDispatch } = useContext(CommentContext)

   const removeExistedImg = () => {
      commentDispatch({ type: 'REMOVE_COMMENT_IMAGE', payload: null })
   }

   return (
      <>
         <StyledCommentImgContainer>
            {commentImage && (
               <StyledCommentImg src={commentImage} alt='included comment image' width={300} height={200} />
            )}
            {isUpdateActive && (
               <IconButtonStyle>
                  <IconButton onClick={removeExistedImg} size='medium' aria-label='delete comment image'>
                     <DeleteIcon fontSize='inherit' />
                  </IconButton>
               </IconButtonStyle>
            )}
         </StyledCommentImgContainer>
      </>
   )
}

export default CommentImage
