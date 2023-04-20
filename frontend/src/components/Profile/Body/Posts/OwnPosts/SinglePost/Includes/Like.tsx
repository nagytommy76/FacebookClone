import React, { useRef } from 'react'

import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Slide from '@mui/material/Slide'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { FooterSectionStyle, ButtonGroupStyle } from '../Styles'

const Like = () => {
   const containerRef = useRef(null)
   return (
      <FooterSectionStyle>
         <ButtonGroupStyle>
            <Tooltip placement='top' enterDelay={500} title='Add'>
               <Button fullWidth startIcon={<ThumbUpOffAltIcon />}>
                  Like
               </Button>
            </Tooltip>
            <Button fullWidth startIcon={<ChatBubbleOutlineIcon />}>
               Hozzászólás
            </Button>
         </ButtonGroupStyle>
      </FooterSectionStyle>
   )
}

export default Like
