import { StyledModalContainer, StyledImageContainer, CloseIconStyle, StyledModalImage } from './Styles'
import Modal from '@mui/material/Modal'
import LeftArrow from './Includes/LeftArrow'
import RightArrow from './Includes/RightArrow'

const ImageSlider: React.FC<{
   isImgSliderOpen: boolean
   postedPicturesPath: string[]
   currentPicIndex: number
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
   nextImage: () => void
   previousImage: () => void
}> = ({
   isImgSliderOpen,
   postedPicturesPath,
   currentPicIndex,
   setIsImgSliderOpen,
   nextImage,
   previousImage,
}) => {
   return (
      <Modal open={isImgSliderOpen}>
         <StyledModalContainer>
            <CloseIconStyle onClick={() => setIsImgSliderOpen(false)} />
            <StyledImageContainer>
               <StyledModalImage
                  sizes='(max-width: 400px) 400px, (max-width: 1200px) 1200px, 100vw'
                  fill
                  src={postedPicturesPath[currentPicIndex]}
                  priority
                  placeholder='blur'
                  blurDataURL={
                     'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAHAAcAAD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwRAAABtbnRyUkdCIFhZWiAH5wAKABIAEQALABFhY3NwTVNGVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAoAEcDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIEAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB8cUu+6Z538pcS4oADRqw6JNDjyWONxQADoFQEAA//8QAHBAAAgICAwAAAAAAAAAAAAAAAAEREgIgAxAh/9oACAEBAAEFAu4KkbYKwsHNWPBj143Bcv4+RNZ+vRCfTHtJYnT/xAAUEQEAAAAAAAAAAAAAAAAAAAAw/9oACAEDAQE/AX//xAAWEQADAAAAAAAAAAAAAAAAAAAQETD/2gAIAQIBAT8BDr//xAAcEAACAAcAAAAAAAAAAAAAAAAAMQEQESAwQGH/2gAIAQEABj8CyUEKN65Ja3//xAAfEAEAAQQDAAMAAAAAAAAAAAABABEgITEQQVFhcZH/2gAIAQEAAT8h5Iqjc0sTSs7nzIpx+UNoJqYSkGbrxo9TpCoRCPasVR9tfA0fuL2K0YcTZ//aAAwDAQACAAMAAAAQAtMgAATEAAAgcgA//8QAFxEBAAMAAAAAAAAAAAAAAAAAARARMP/aAAgBAwEBPxCAvX//xAAWEQADAAAAAAAAAAAAAAAAAAARIDD/2gAIAQIBAT8QcIf/xAAeEAEBAQACAgMBAAAAAAAAAAABEQAhMSBREGHB0f/aAAgBAQABPxD4C53IHJMpkni7SiFVZDFFWOnNPeWawDufWecB65aK+B3qINSMdI4g6hy0IGCCtThP3dgcQM9/3UcBSoZ78Ju4+8uQ49jT+3s13xhmNU7zOW/P/9k='
                  }
                  alt=''
               />
            </StyledImageContainer>
            <LeftArrow previousImage={previousImage} />
            <RightArrow nextImage={nextImage} />
         </StyledModalContainer>
      </Modal>
   )
}

export default ImageSlider
