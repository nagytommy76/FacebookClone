import { useEffect } from 'react'
import axios from 'axios'
import useLogout from '../../hooks/useLogout'

const DEVELOPMENT_URL = 'http://localhost:3000'
//const PRODUCTION_URL = ''

const isAxiosError = axios.isAxiosError
const axiosInstance = axios.create({
   // docker port
   // baseURL: 'http://localhost:5040/api',
   baseURL: 'http://localhost:5050/api',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': DEVELOPMENT_URL,
      //'Access-Control-Allow-Origin': PRODUCTION_URL,
      'Access-Control-Allow-Credentials': true,
   },
})

const AxiosSetupProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
   const logout = useLogout()

   useEffect(() => {
      console.count('UseEffect: ')
      axiosInstance.interceptors.response.use(
         (response) => {
            return response
         },
         async (error) => {
            // Ebben az esetben nincs accessToken a cookie-ban, ezért kell egy új -->
            console.log(error.response.data.errorMessage)
            if (
               error.response.status === 404 &&
               error.response.data.errorMessage === 'refreshToken not found'
            ) {
               console.log('Nincs refresh token, kilépés')
               return await logout()
            }
            if (
               error.config &&
               error.response &&
               !error.config._retry &&
               error.response.status === 404 &&
               error.response.data.errorMessage === 'accessToken not found'
            ) {
               // Ekkor kell egy új accessToken (Forbidden) / 403 error, tehát lejárt az accessToken
               try {
                  await axiosInstance.post('/auth/generate-access-token')
                  console.count('lefut???::::: ')
                  return axios.request(error.config)
               } catch (error) {
                  console.count('sima catch ág: ')
                  // ha itt hiba van lejárt a refreshToken
                  if (
                     isAxiosError(error) &&
                     error.response?.status === 403 &&
                     error.response?.data.errorMessage === 'refreshToken expired'
                  ) {
                     // Ki kell léptetni a usert
                     console.count('lefutok, alkalommal: ')
                     await logout()
                  }
               }
            }
            // else {
            //    console.log('Else logout fut leeeee')
            //    await logout()
            // }
         }
      )
   }, [])

   return children
}

export default AxiosSetupProvider
export * from 'axios'
export { axiosInstance, isAxiosError }
