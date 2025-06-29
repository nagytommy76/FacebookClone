import { useState } from 'react'

export default function useImageSlider() {
   const [imageSliderOpen, setImageSliderOpen] = useState<boolean>(false)
   const [selectedImgUrl, setSelectedImgUrl] = useState<string[]>([''])

   function onClickImage(image: string) {
      setSelectedImgUrl([image])
      setImageSliderOpen(true)
   }

   return { onClickImage, setImageSliderOpen, imageSliderOpen, selectedImgUrl }
}
