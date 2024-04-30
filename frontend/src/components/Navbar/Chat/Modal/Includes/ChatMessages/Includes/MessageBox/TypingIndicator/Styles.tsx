import { styled, keyframes } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const mercuryTypingAnimation = keyframes`
   0% {
    transform: translateY(0px);
    background-color:#6CAD96; // rgba(20,105,69,.7);
  }
  28% {
    transform: translateY(-7px);
    background-color:#9ECAB9; //rgba(20,105,69,.4);
  }
  44% {
    transform: translateY(0px);
    background-color: #B5D9CB; //rgba(20,105,69,.2);
  }
`

export const ChatBubbleStyle = styled(Paper)({
   display: 'flex',
   justifyContent: 'center',
   padding: '.65rem',
   width: '100px',
   borderRadius: '25px',
   borderBottomLeftRadius: '2px',

   position: 'static',
   bottom: 5,
   left: 5,
})

export const TypingStyle = styled('div')({
   display: 'flex',
   alignItems: 'center',
   height: '17px',
})

export const DotStyle = styled('div')({
   display: 'inline-block',
   height: '7px',
   width: '7px',
   borderRadius: '50%',
   marginRight: '4px',
   backgroundColor: '#6CAD96', // VÁLTOZTATNI

   verticalAlign: 'middle',
   animation: `${mercuryTypingAnimation} 1s infinite ease-in-out`,

   [`&:nth-child(1)`]: {
      animationDelay: '200ms',
   },
   [`&:nth-child(2)`]: {
      animationDelay: '300ms',
   },
   [`&:nth-child(3)`]: {
      animationDelay: '400ms',
   },
   [`&:nth-child(4)`]: {
      animationDelay: '500ms',
   },
})
