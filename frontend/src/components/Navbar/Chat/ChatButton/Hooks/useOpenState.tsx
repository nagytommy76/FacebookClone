import { useState } from 'react'

const useOpenState = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const isOpen = Boolean(anchorEl)
   const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   return { anchorEl, isOpen, handleOpen, handleClose }
}

export default useOpenState
