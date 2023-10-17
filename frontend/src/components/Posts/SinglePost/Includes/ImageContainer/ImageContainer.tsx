import React, { useState } from 'react'
import {
   StyledImageGridContainer,
   StyledImage,
   FirstGridImage,
   OverlayedContent,
   OverlayedContainer,
} from './Styles'
import StockImage from '@/assets/facebook-profile.jpg'

const ImageContainer: React.FC<{
   postedPicturesPath: string[]
   setCurrentPicIndex: React.Dispatch<React.SetStateAction<number>>
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ postedPicturesPath, setCurrentPicIndex, setIsImgSliderOpen }) => {
   const [loading, setLoading] = useState(true)
   const setPicIndexAndOpenModal = (index: number) => {
      setCurrentPicIndex(index)
      setIsImgSliderOpen(true)
   }

   const buffer = async () => {
      const result = fetch(postedPicturesPath[0]).then(async (result) => {
         return Buffer.from(await result.arrayBuffer()).toString('base64')
      })
      return result
   }

   //https://www.youtube.com/watch?v=6zDb1kh52nM&ab_channel=OlivierLarose
   // https://dev.to/nicolaserny/blurred-image-placeholder-with-nextjs-image-and-cloudinary-4dhm

   // const data = await buffer()
   // console.log(data)
   return (
      <StyledImageGridContainer>
         {postedPicturesPath.map((image, index) =>
            index === 0 ? (
               <FirstGridImage
                  loading='lazy'
                  // placeholder='blur'
                  onLoadingComplete={() => setLoading(false)}
                  onClick={() => setPicIndexAndOpenModal(index)}
                  key={index}
                  src={image == '' ? StockImage : image}
                  alt='Kép'
                  width={800}
                  height={500}
               />
            ) : (
               index < 4 &&
               (index === 3 ? (
                  <OverlayedContainer onClick={() => setPicIndexAndOpenModal(index)} key={index}>
                     <StyledImage src={image == '' ? StockImage : image} alt='Kép' width={500} height={500} />
                     <OverlayedContent>+{postedPicturesPath.length - index - 1}</OverlayedContent>
                  </OverlayedContainer>
               ) : (
                  <StyledImage
                     loading='lazy'
                     // placeholder='blur'
                     onLoadingComplete={() => setLoading(false)}
                     onClick={() => setPicIndexAndOpenModal(index)}
                     key={index}
                     src={image == '' ? StockImage : image}
                     alt='Kép'
                     width={400}
                     height={250}
                  />
               ))
            )
         )}
      </StyledImageGridContainer>
   )
}

export default ImageContainer
