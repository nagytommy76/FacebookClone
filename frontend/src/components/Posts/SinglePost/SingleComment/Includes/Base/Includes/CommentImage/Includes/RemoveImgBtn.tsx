import { useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'

import { IconButtonStyle } from '../Styles'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Fade from '@mui/material/Fade'

const RemoveImgBtn: React.FC<{
   isUpdateActive: boolean
   commentImage: string | null
}> = ({ commentImage, isUpdateActive }) => {
   const { commentDispatch } = useContext(CommentContext)
   const removeExistedImg = () => {
      commentDispatch({ type: 'REMOVE_COMMENT_IMAGE', payload: null })
   }

   return (
      <>
         {isUpdateActive && commentImage !== null && (
            <Fade in={isUpdateActive && commentImage !== null}>
               <IconButtonStyle>
                  <IconButton
                     onClick={removeExistedImg}
                     color='error'
                     size='medium'
                     aria-label='delete comment image'
                  >
                     <DeleteIcon fontSize='inherit' />
                  </IconButton>
               </IconButtonStyle>
            </Fade>
         )}
      </>
   )
}

export default RemoveImgBtn
