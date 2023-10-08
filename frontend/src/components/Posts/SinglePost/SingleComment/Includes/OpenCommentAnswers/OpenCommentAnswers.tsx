import React, { useState } from 'react'

import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'

const OpenCommentAnswers: React.FC<{
   children: React.ReactNode
   isFirstAnswer: boolean
   answerLength: number
}> = ({ answerLength, children, isFirstAnswer }) => {
   const [isAnswerOpened, setIsAnswerOpened] = useState<boolean>(false)
   return (
      <>
         {isFirstAnswer && (
            <>
               <Button
                  onClick={() => setIsAnswerOpened((prev) => !prev)}
                  variant='text'
                  startIcon={<SubdirectoryArrowRightIcon />}
               >
                  {answerLength} válasz
               </Button>
               <Collapse in={isAnswerOpened}>{children}</Collapse>
            </>
         )}
      </>
   )
}

export default OpenCommentAnswers
