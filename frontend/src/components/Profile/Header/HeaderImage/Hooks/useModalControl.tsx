import { useState } from 'react'

const useModalControl = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const handleOpenDialog = () => {
      setIsModalOpen(true)
   }
   const handleCloseDialog = () => {
      setIsModalOpen(false)
   }
   return { isModalOpen, handleCloseDialog, handleOpenDialog }
}

export default useModalControl
