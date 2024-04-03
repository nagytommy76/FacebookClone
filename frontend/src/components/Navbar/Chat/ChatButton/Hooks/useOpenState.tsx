import { useAppDispatch } from '@/reduxStore/store'
import { setChatModalOpen } from '@/reduxStore/slices/ChatSlice'

const useOpenState = () => {
   const dispatch = useAppDispatch()
   const handleOpen = () => dispatch(setChatModalOpen(true))

   return { handleOpen }
}

export default useOpenState
