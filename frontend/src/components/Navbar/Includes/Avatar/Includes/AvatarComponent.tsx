import React from 'react'

import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { deepOrange } from '@mui/material/colors'

const AvatarComponent: React.FC<{
   setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ setAnchorEl }) => {
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
   }

   return (
      <Stack direction='row' spacing={1}>
         <Tooltip title='Fiók'>
            <IconButton size='small' onClick={handleClick}>
               <Avatar sx={{ bgcolor: deepOrange[500], width: 45, height: 45 }}>NT</Avatar>
            </IconButton>
         </Tooltip>
      </Stack>
   )
}

export default AvatarComponent
