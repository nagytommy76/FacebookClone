import React, { useState } from 'react'

import ImageSlider from '@/components/Base/ImageSlider/ImageSlider'
import ImageContainer from '../ImageContainer/ImageContainer'

const ImageSlide: React.FC<{ postedPicturesPath: string[] }> = ({ postedPicturesPath }) => {
   const [isImgSliderOpen, setIsImgSliderOpen] = useState<boolean>(false)
   const [currentPicIndex, setCurrentPicIndex] = useState<number>(0)

   const nextImage = () => {
      if (postedPicturesPath.length > 1) {
         setCurrentPicIndex(currentPicIndex === postedPicturesPath.length - 1 ? 0 : currentPicIndex + 1)
      }
   }
   const previousImage = () => {
      if (postedPicturesPath.length > 1) {
         setCurrentPicIndex(currentPicIndex === 0 ? postedPicturesPath.length - 1 : currentPicIndex - 1)
      }
   }

   return (
      <>
         <ImageContainer
            setIsImgSliderOpen={setIsImgSliderOpen}
            setCurrentPicIndex={setCurrentPicIndex}
            postedPicturesPath={postedPicturesPath}
         />
         <ImageSlider
            nextImage={nextImage}
            previousImage={previousImage}
            setIsImgSliderOpen={setIsImgSliderOpen}
            currentPicIndex={currentPicIndex}
            isImgSliderOpen={isImgSliderOpen}
            postedPicturesPath={postedPicturesPath}
         />
      </>
   )
}

export default ImageSlide
