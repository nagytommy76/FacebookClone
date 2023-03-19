import { useRouter } from 'next/router'
import { axiosInstance as axios } from '../utils/axiosSetup/AxiosInstance'

import { useAppDispatch } from '../utils/redux/store'
import { setLogoutUser } from '../utils/redux/slices/AuthSlice'

const useLogout = () => {
   const dispatch = useAppDispatch()
   const router = useRouter()

   const logoutLogic = () => {
      dispatch(setLogoutUser())
      router.push('/login')
   }

   const logout = async () => {
      try {
         const response = await axios.post('/auth/logout')
         console.log(response.status)
         if (response.status === 200) {
            logoutLogic()
         }
      } catch (error) {
         console.log(error)
      } finally {
         logoutLogic()
      }
   }

   return logout
}

export default useLogout
