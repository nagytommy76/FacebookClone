import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const ImageSlider = dynamic(() => import('@/Base/ImageSlider/ImageSlider'))

const ImageDisplay: React.FC<{ imagePath: string; isRightContent?: boolean }> = ({
   imagePath,
   isRightContent = false,
}) => {
   const [isImgSliderOpen, setIsImgSliderOpen] = useState<boolean>(false)

   return (
      <div
         style={{
            width: '100%',
            display: 'flex',
            justifyContent: isRightContent ? 'end' : 'start',
         }}
      >
         <Image
            onClick={() => setIsImgSliderOpen(true)}
            style={{ objectFit: 'cover', cursor: 'pointer' }}
            src={imagePath}
            alt='Message image'
            width={300}
            height={250}
         />
         <ImageSlider
            setIsImgSliderOpen={() => setIsImgSliderOpen(false)}
            isImgSliderOpen={isImgSliderOpen}
            currentPicIndex={0}
            postedPicturesPath={[imagePath]}
            nextImage={() => {}}
            previousImage={() => {}}
         />
      </div>
   )
}

export default ImageDisplay
