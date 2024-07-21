import { useAppDispatch } from '@/reduxStore/store'
import { setIsInfoSnackOpen, setImageSrc, setHeadText, setMessage } from '@/reduxStore/slices/InfoSnack'

const useSetInfoSnack = () => {
   const dispatch = useAppDispatch()

   const setInfoSnackbar = (message: string, headText: string, imageSrc: string) => {
      dispatch(setImageSrc(imageSrc))
      dispatch(setMessage(message))
      dispatch(setHeadText(headText))
      dispatch(setIsInfoSnackOpen(true))
   }
   return setInfoSnackbar
}

export default useSetInfoSnack
