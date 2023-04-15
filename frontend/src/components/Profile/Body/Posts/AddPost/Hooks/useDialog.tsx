import { useState } from 'react'

const useDialog = () => {
   const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false)
   const handleDialogClickOpen = () => {
      setAddDialogOpen(true)
   }
   const handleDialogClose = () => {
      setAddDialogOpen(false)
   }
   return {
      addDialogOpen,
      handleDialogClickOpen,
      handleDialogClose,
   }
}

export default useDialog
