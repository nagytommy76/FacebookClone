import React, { useState } from 'react'
import Image from 'next/image'

import { StyledModalContainer, StyledImageContainer } from './Styles'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const ImageSlider: React.FC<{
   isImgSliderOpen: boolean
   postedPicturesPath: string[]
   currentPicIndex: number
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isImgSliderOpen, postedPicturesPath, currentPicIndex, setIsImgSliderOpen }) => {
   //    const [currentPic, setCurrentPic] = useState<number>(0)
   const [direction, setDirection] = useState<'left' | 'up' | 'down' | 'right'>('right')
   const [isSlide, setIsSlide] = useState<boolean>(true)

   return (
      <Modal open={isImgSliderOpen}>
         <StyledModalContainer>
            <HighlightOffIcon sx={{ color: 'red' }} onClick={() => setIsImgSliderOpen(false)} />
            <Fade in={isSlide}>
               <StyledImageContainer>
                  <Image width={500} height={500} src={postedPicturesPath[currentPicIndex]} alt='' />
               </StyledImageContainer>
            </Fade>
         </StyledModalContainer>
      </Modal>
   )
}

export default ImageSlider
