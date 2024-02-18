import { useState } from 'react'

const useHandleMenu = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)

   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   return {
      anchorEl,
      open,
      handleClose,
      handleClickOpen,
   }
}

export default useHandleMenu
