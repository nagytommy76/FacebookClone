import React from 'react'

import Tooltip from '@mui/material/Tooltip'
import useMoment from '@/hooks/useMoment'

const TooltipWrapper: React.FC<{
   children: React.ReactNode
   lastSeen: number
}> = ({ children, lastSeen }) => {
   const timeFromNow = useMoment(lastSeen)
   return (
      <Tooltip placement='left' title={timeFromNow}>
         {children}
      </Tooltip>
   )
}

export default TooltipWrapper
