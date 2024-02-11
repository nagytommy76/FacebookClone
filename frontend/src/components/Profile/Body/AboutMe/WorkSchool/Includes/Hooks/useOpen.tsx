import { useState } from 'react'

const useOpen = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const handleSetOpen = () => {
      setIsOpen((prevOpen) => !prevOpen)
   }

   return { isOpen, handleSetOpen }
}

export default useOpen
