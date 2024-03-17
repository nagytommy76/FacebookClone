import React, { SetStateAction } from 'react'
import Image from 'next/image'
import NotificationIcon from '@/assets/no-alarm.png'

import Typography from '@mui/material/Typography'
import { StyledEmptyMenuItem, StyledMenuContainer } from '../Style'
import BaseMenu from './BaseMenu'

const EmptyNotification: React.FC<{
   anchorEl: HTMLElement | null
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
}> = ({ anchorEl, setAnchorEl }) => {
   return (
      <BaseMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
         <StyledMenuContainer>
            <StyledEmptyMenuItem>
               <Typography gutterBottom variant='h5'>
                  Nincsenek értesítések!
               </Typography>
               <Image src={NotificationIcon.src} alt='No notification icon' width={128} height={128} />
            </StyledEmptyMenuItem>
         </StyledMenuContainer>
      </BaseMenu>
   )
}

export default EmptyNotification
