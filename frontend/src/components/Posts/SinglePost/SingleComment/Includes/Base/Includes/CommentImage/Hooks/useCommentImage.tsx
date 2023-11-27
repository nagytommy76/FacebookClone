import { useState } from 'react'

const useCommentImage = () => {
   const [isImgSliderOpen, setIsImgSliderOpen] = useState<boolean>(false)

   const openImgSlide = () => setIsImgSliderOpen(true)

   return {
      isImgSliderOpen,
      openImgSlide,
      setIsImgSliderOpen,
   }
}

export default useCommentImage
