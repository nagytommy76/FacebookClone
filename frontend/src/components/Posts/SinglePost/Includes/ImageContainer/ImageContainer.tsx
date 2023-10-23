'use client'
import React from 'react'
import {
   StyledImageGridContainer,
   StyledImage,
   FirstGridImage,
   OverlayedContent,
   OverlayedContainer,
} from './Styles'

const ImageContainer: React.FC<{
   postedPicturesPath: string[]
   setCurrentPicIndex: React.Dispatch<React.SetStateAction<number>>
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ postedPicturesPath, setCurrentPicIndex, setIsImgSliderOpen }) => {
   const setPicIndexAndOpenModal = (index: number) => {
      setCurrentPicIndex(index)
      setIsImgSliderOpen(true)
   }

   return (
      <StyledImageGridContainer>
         {postedPicturesPath.map((image, index) =>
            index === 0 ? (
               <FirstGridImage
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL={
                     'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAHAAcAAD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwRAAABtbnRyUkdCIFhZWiAH5wAKABIAEQALABFhY3NwTVNGVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAoAEcDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIEAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB8cUu+6Z538pcS4oADRqw6JNDjyWONxQADoFQEAA//8QAHBAAAgICAwAAAAAAAAAAAAAAAAEREgIgAxAh/9oACAEBAAEFAu4KkbYKwsHNWPBj143Bcv4+RNZ+vRCfTHtJYnT/xAAUEQEAAAAAAAAAAAAAAAAAAAAw/9oACAEDAQE/AX//xAAWEQADAAAAAAAAAAAAAAAAAAAQETD/2gAIAQIBAT8BDr//xAAcEAACAAcAAAAAAAAAAAAAAAAAMQEQESAwQGH/2gAIAQEABj8CyUEKN65Ja3//xAAfEAEAAQQDAAMAAAAAAAAAAAABABEgITEQQVFhcZH/2gAIAQEAAT8h5Iqjc0sTSs7nzIpx+UNoJqYSkGbrxo9TpCoRCPasVR9tfA0fuL2K0YcTZ//aAAwDAQACAAMAAAAQAtMgAATEAAAgcgA//8QAFxEBAAMAAAAAAAAAAAAAAAAAARARMP/aAAgBAwEBPxCAvX//xAAWEQADAAAAAAAAAAAAAAAAAAARIDD/2gAIAQIBAT8QcIf/xAAeEAEBAQACAgMBAAAAAAAAAAABEQAhMSBREGHB0f/aAAgBAQABPxD4C53IHJMpkni7SiFVZDFFWOnNPeWawDufWecB65aK+B3qINSMdI4g6hy0IGCCtThP3dgcQM9/3UcBSoZ78Ju4+8uQ49jT+3s13xhmNU7zOW/P/9k='
                  }
                  onClick={() => setPicIndexAndOpenModal(index)}
                  key={index}
                  src={image ? image : ''}
                  alt='Kép'
                  width={800}
                  height={500}
               />
            ) : (
               index < 4 &&
               (index === 3 ? (
                  <OverlayedContainer onClick={() => setPicIndexAndOpenModal(index)} key={index}>
                     <StyledImage src={image} alt='Kép' width={500} height={500} />
                     <OverlayedContent>+{postedPicturesPath.length - index - 1}</OverlayedContent>
                  </OverlayedContainer>
               ) : (
                  <StyledImage
                     loading='lazy'
                     placeholder='blur'
                     blurDataURL={
                        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAHAAcAAD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwRAAABtbnRyUkdCIFhZWiAH5wAKABIAEQALABFhY3NwTVNGVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAoAEcDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIEAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB8cUu+6Z538pcS4oADRqw6JNDjyWONxQADoFQEAA//8QAHBAAAgICAwAAAAAAAAAAAAAAAAEREgIgAxAh/9oACAEBAAEFAu4KkbYKwsHNWPBj143Bcv4+RNZ+vRCfTHtJYnT/xAAUEQEAAAAAAAAAAAAAAAAAAAAw/9oACAEDAQE/AX//xAAWEQADAAAAAAAAAAAAAAAAAAAQETD/2gAIAQIBAT8BDr//xAAcEAACAAcAAAAAAAAAAAAAAAAAMQEQESAwQGH/2gAIAQEABj8CyUEKN65Ja3//xAAfEAEAAQQDAAMAAAAAAAAAAAABABEgITEQQVFhcZH/2gAIAQEAAT8h5Iqjc0sTSs7nzIpx+UNoJqYSkGbrxo9TpCoRCPasVR9tfA0fuL2K0YcTZ//aAAwDAQACAAMAAAAQAtMgAATEAAAgcgA//8QAFxEBAAMAAAAAAAAAAAAAAAAAARARMP/aAAgBAwEBPxCAvX//xAAWEQADAAAAAAAAAAAAAAAAAAARIDD/2gAIAQIBAT8QcIf/xAAeEAEBAQACAgMBAAAAAAAAAAABEQAhMSBREGHB0f/aAAgBAQABPxD4C53IHJMpkni7SiFVZDFFWOnNPeWawDufWecB65aK+B3qINSMdI4g6hy0IGCCtThP3dgcQM9/3UcBSoZ78Ju4+8uQ49jT+3s13xhmNU7zOW/P/9k='
                     }
                     onClick={() => setPicIndexAndOpenModal(index)}
                     key={index}
                     src={image ? image : ''}
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
