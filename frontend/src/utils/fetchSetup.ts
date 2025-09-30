import { cookies } from 'next/headers'

const DEVELOPMENT_API_URL = 'http://localhost:5050/api'

export default async function fetchSetup(
   endpoint: string,
   method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
   options?: RequestInit
): Promise<Response> {
   const cookie = cookies()
   const defaultHeaders: HeadersInit = {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `accessToken=${cookie.get('accessToken')?.value};refreshToken=${
         cookie.get('refreshToken')?.value
      }`,
   }

   const fetchOptions: RequestInit = {
      ...options,
      method,
      headers: {
         ...defaultHeaders,
         ...options?.headers,
      },
      credentials: 'include',
      cache: 'no-store',
   }

   try {
      const response = await fetch(`${DEVELOPMENT_API_URL}${endpoint}`, fetchOptions)
      const responseData = await response.json()

      // if (response.ok) return response
      console.log('RESPONSE STATUS: ', responseData)
      if (response.status === 403 && responseData.errorMessage === 'accessToken expired') {
         const response = await fetch('http://localhost:5050/api/auth/generate-access-token', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Cookie: `accessToken=${cookie.get('accessToken')?.value};refreshToken=${
                  cookie.get('refreshToken')?.value
               }`,
            },
            credentials: 'include',
         })

         console.log(response.status)
      }

      // if (response.status === 404 && response.errorMessage === 'refreshToken not found') {
      //    // console.log('FDSFDSDSFSD')
      //    return await Promise.reject('refreshToken not found')
      // }
      if (response.ok) return await response.json()

      // return await response.json()
      throw new Error('No response returned from fetchSetup')
   } catch (error) {
      console.log('ERROR MIKOR LESZ?')
      throw error
   }
}
