import { useEffect } from 'react'
import { useAppDispatch } from '@/reduxStore/store'
import { setMobileView } from '@/reduxStore/slices/ThemeSlice'

const useSetMobileView = () => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            dispatch(setMobileView(true))
         } else {
            dispatch(setMobileView(false))
         }
      }
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   })
   return null
}

export default useSetMobileView
