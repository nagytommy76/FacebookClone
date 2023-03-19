import React from 'react'

import ImageAvatar from './ImageAvatar'

import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

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
               <ImageAvatar />
            </IconButton>
         </Tooltip>
      </Stack>
   )
}

export default AvatarComponent
