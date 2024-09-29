import { cookies, headers } from 'next/headers'

const DEVELOPMENT_API_URL = 'http://localhost:5050/api'

export default async function fetchSetup(
   endpoint: string,
   method: string = 'GET',
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
      const contentType = response.headers.get('Content-Type') || ''
      //   console.log(response)
      console.log(`${DEVELOPMENT_API_URL}${endpoint}`)
      console.log(contentType)
      if (response.ok) return response

      if (contentType.includes('application/json') && response.status === 404) {
         console.log('404 error: ', response.url)
         const responseJson = await response.json()
         //  console.log(responseJson)
      }
      return response
      //   throw new Error(response.statusText)
   } catch (error) {
      throw error
   }
}
