import { styled } from '@mui/material'

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'

const CustomTooltipTitle = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} enterDelay={500} leaveDelay={500} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      minWidth: 360,
      backgroundColor: 'transparent',
      padding: 0,
   },
}))

export default CustomTooltipTitle
