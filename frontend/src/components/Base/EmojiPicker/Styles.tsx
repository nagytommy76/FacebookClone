import { styled } from '@mui/material'

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'

export const StyledEmojiTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
   },
}))
