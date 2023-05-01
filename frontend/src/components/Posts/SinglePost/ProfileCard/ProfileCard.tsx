import React from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
   },
}))

const DetailsTooltipTitle = () => {
   return (
      <Paper>
         <h1>Tamás Nagy</h1>
      </Paper>
   )
}

const ProfileCard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
   return (
      <HtmlTooltip placement='bottom-start' title={<DetailsTooltipTitle />}>
         {children}
      </HtmlTooltip>
   )
}

export default ProfileCard
