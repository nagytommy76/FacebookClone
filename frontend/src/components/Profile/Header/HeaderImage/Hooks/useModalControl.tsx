import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/reduxStore/store'

const useModalControl = () => {
   const params = useParams() as { userId: string }
   const loggedInUserId = useAppSelector((state) => state.auth.userId)

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const handleOpenDialog = () => {
      if (loggedInUserId == params.userId) {
         setIsModalOpen(true)
      }
   }
   const handleCloseDialog = () => {
      setIsModalOpen(false)
   }
   return { isModalOpen, handleCloseDialog, handleOpenDialog }
}

export default useModalControl
