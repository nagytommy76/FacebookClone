import { useState } from 'react'

const useTooltip = () => {
   const [open, setOpen] = useState<boolean>(false)

   const handleClose = () => {
      setOpen(false)
   }
   const handleClick = () => {
      setOpen(true)
   }

   return { open, handleClose, handleClick }
}

export default useTooltip
