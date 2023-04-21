import React from 'react'

import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { FooterSectionStyle, ButtonGroupStyle, CustomTooltipTitle } from '../Styles'

import Reactions from './Reactions'

const Like = () => {
   return (
      <FooterSectionStyle>
         <ButtonGroupStyle>
            <CustomTooltipTitle open={true} placement='top' enterDelay={500} title={<Reactions />}>
               <Button fullWidth startIcon={<ThumbUpOffAltIcon />}>
                  Like
               </Button>
            </CustomTooltipTitle>
            <Button fullWidth startIcon={<ChatBubbleOutlineIcon />}>
               Hozzászólás
            </Button>
         </ButtonGroupStyle>
      </FooterSectionStyle>
   )
}

export default Like
