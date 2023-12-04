import { useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'
import { AnswerContext } from '@/AnswersContext/AnswersContext'

import { IconButtonStyle } from '../Styles'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Fade from '@mui/material/Fade'

const RemoveImgBtn: React.FC<{
   isUpdateActive: boolean
   answerId: string
   commentImage: string | null
   isAnswer?: boolean
}> = ({ commentImage, isUpdateActive, answerId, isAnswer = false }) => {
   const { commentDispatch } = useContext(CommentContext)
   const { answerDispatch } = useContext(AnswerContext)
   const removeExistedImg = () => {
      if (!isAnswer) commentDispatch({ type: 'REMOVE_COMMENT_IMAGE', payload: null })
      else answerDispatch({ type: 'REMOVE_ANSWER_IMAGE', payload: answerId })
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
