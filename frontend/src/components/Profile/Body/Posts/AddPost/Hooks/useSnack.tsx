import { useState } from 'react'

const useSnack = () => {
   const [isSnackOpen, setIsSnackOpen] = useState<{ isOpen: boolean; msg: string }>({
      isOpen: false,
      msg: '',
   })

   const handleSnackOpenIfSuccess = () => {
      setIsSnackOpen((prevValue) => {
         return {
            ...prevValue,
            isOpen: true,
            msg: 'Sikeresen posztoltál!',
         }
      })
   }
   const handleSnackClose = () => {
      setIsSnackOpen((prevValue) => {
         return {
            ...prevValue,
            isOpen: false,
         }
      })
   }
   return {
      isSnackOpen,
      handleSnackClose,
      handleSnackOpenIfSuccess,
   }
}

export default useSnack
