import { ChatBubbleStyle, TypingStyle, DotStyle } from './Styles'
import Fade from '@mui/material/Fade'

const TypingIndicator: React.FC<{ typingStatus: boolean }> = ({ typingStatus }) => {
   return (
      <Fade in={typingStatus}>
         <ChatBubbleStyle>
            <TypingStyle>
               <DotStyle />
               <DotStyle />
               <DotStyle />
               <DotStyle />
            </TypingStyle>
         </ChatBubbleStyle>
      </Fade>
   )
}

export default TypingIndicator
