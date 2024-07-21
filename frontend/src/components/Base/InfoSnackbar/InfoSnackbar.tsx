import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setIsInfoSnackOpen } from '@/reduxStore/slices/InfoSnack'
import DefaultImage from '@/assets/facebook-profile.jpg'

import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { StyledMessageSection, StyledTypographySection } from './Styles'

const InfoSnackbar = () => {
   const dispatch = useAppDispatch()
   const { isInfoSnackOpen, headText, imageSrc, message } = useAppSelector((state) => state.infoSnack)
   const handleClose = () => dispatch(setIsInfoSnackOpen(false))

   return (
      <>
         <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Slide}
            open={isInfoSnackOpen}
            autoHideDuration={60000}
            onClose={handleClose}
            message={
               <StyledMessageSection>
                  <Image src={imageSrc ? imageSrc : DefaultImage} alt='Image' width={70} height={70} />
                  <StyledTypographySection>
                     <Typography variant='subtitle2' color={'black'}>
                        {headText}
                     </Typography>
                     <Typography
                        variant='body2'
                        color={'black'}
                        sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                     >
                        {message}
                     </Typography>
                  </StyledTypographySection>
               </StyledMessageSection>
            }
            action={
               <IconButton onClick={handleClose} color='error'>
                  <CloseIcon />
               </IconButton>
            }
         ></Snackbar>
      </>
   )
}

export default InfoSnackbar
