import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
   const refreshToken = request.cookies.get('refreshToken')?.value

   if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   //  Ha van refresh token megnézem, hogy valid-e fetch-el, axios nem müxik
   const response = await fetch(`${process.env.NEXT_PUBLIC_PROD_API_URL}auth/refresh-token`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include',
   })

   if (response.status === 403) {
      let redirectResponse = NextResponse.redirect(new URL('/login', request.url))
      redirectResponse.cookies.delete('accessToken')
      redirectResponse.cookies.delete('refreshToken')
      return redirectResponse
   }

   return NextResponse.next()
}

// Itt tudom a route-okat hozzáadni -> mire legyen érvényes
export const config = {
   matcher: ['/', '/friends', '/groups', '/me'],
}
