import { useState } from 'react'

const useOpenState = () => {
   const [modalOpen, setModalOpen] = useState(false)
   const handleOpen = () => setModalOpen(true)
   const handleClose = () => setModalOpen(false)

   return { modalOpen, handleOpen, handleClose }
}

export default useOpenState
