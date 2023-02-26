import { useAppDispatch } from '../../../../app/store'
import { setAccessToken } from '../../../../app/slices/TokenSlice'
import { setUserName, setIsLoggedIn, setUserId } from '../../../../app/slices/AuthSlice'

import type { AxiosResponse } from 'axios'
import type { ILoginData } from '../../Register/Includes/Types'

const useOnSuccess = () => {
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
   }
   return onSuccessFn
}

export default useOnSuccess
