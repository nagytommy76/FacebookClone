import React from 'react'

import { StyledPaperContainer, StyledTextContainer, StyledTextInput } from './Styles'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'

const Comment: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
   return (
      <>
         <Collapse orientation='vertical' in={true}>
            <form role='presentation'>
               <StyledPaperContainer>
                  <StyledTextContainer>
                     <StyledTextInput
                        placeholder='Hozzászólás írása...'
                        multiline
                        variant='standard'
                        fullWidth
                     />
                  </StyledTextContainer>
               </StyledPaperContainer>
            </form>
         </Collapse>
      </>
   )
}

export default Comment
