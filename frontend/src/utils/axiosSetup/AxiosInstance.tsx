import axios from 'axios'

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

axiosInstance.interceptors.response.use(
   (response) => {
      return response
   },
   async (error) => {
      console.log(error)
      // Ebben az esetben nincs accessToken a cookie-ban, ezért kell egy új -->
      if (error.config && error.response && !error.config._retry && error.response.status === 401) {
         // Ekkor kell egy új accessToken (Forbidden) / 403 error, tehát lejárt az accessToken
         const accessTokenResult = await axiosInstance.post('/auth/generate-access-token')
         console.log(accessTokenResult.data)
      }
   }
)

export * from 'axios'
export { axiosInstance, isAxiosError }
