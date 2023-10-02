import { styled } from '@mui/material'

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

export const StyledPaperContainer = styled(Paper, {
   shouldForwardProp: (prop) => prop !== 'isAddPostComment',
})(({ isAddPostComment = false }: { isAddPostComment: boolean }) => ({
   width: `${isAddPostComment ? '100%' : '90%'}`,
   marginTop: '5px',
   borderRadius: '25px',
   backgroundColor: 'rgba(100,100,100, 0.35)',
}))

export const StyledTextContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   padding: '.5rem .7rem',
})

export const StyledTextInput = styled(TextField)({
   ['& .MuiInputBase-root::before']: {
      display: 'none',
   },
   ['& .MuiInputBase-root::after']: {
      display: 'none',
   },

   ['& .MuiInputBase-root']: {
      fontSize: '14px',
   },
})

export const StyledEmojiTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
   },
}))
