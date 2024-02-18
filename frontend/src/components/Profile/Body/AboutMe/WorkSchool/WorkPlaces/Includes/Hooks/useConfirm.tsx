import { useState } from 'react'

const useConfirm = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const handleOpenDialog = () => {
      setIsOpen(true)
   }

   const handleCloseDialog = () => {
      setIsOpen(false)
   }

   return { isOpen, setIsOpen, handleCloseDialog, handleOpenDialog }
}

export default useConfirm
