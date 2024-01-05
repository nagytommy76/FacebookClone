import { useAppDispatch } from '@/reduxStore/store'
import { setAccessToken } from '@/reduxStore/slices/TokenSlice'
import { useRouter } from 'next/navigation'
import { setUserName, setIsLoggedIn, setUserId } from '@/reduxStore/slices/AuthSlice'

import type { AxiosResponse } from 'axios'
import type { ILoginData } from '../../Register/Includes/Types'

const useOnSuccess = () => {
   const router = useRouter()
   const dispatch = useAppDispatch()

   const onSuccessFn = (data: AxiosResponse<ILoginData>) => {
      // https://www.youtube.com/watch?v=ss-_S1Vyxa0&ab_channel=SonnySangha
      // Sikeres a belépés ->
      // 1. elmentem az accessToken-t és a user adatokat redux-ba
      // 2. majd átirányítom a usert a feeds oldalra
      dispatch(setAccessToken(data.data.accessToken))
      dispatch(setUserName(data.data.userName))
      dispatch(setUserId(data.data.userId))
      dispatch(setIsLoggedIn(true))
      router.push('/')
   }
   return onSuccessFn
}

export default useOnSuccess
