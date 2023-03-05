import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const refreshToken = request.cookies.get('refreshToken')?.value
   if (!refreshToken) return NextResponse.redirect(new URL('/login', request.url))
   //  Ha van access token megnézem, hogy valid-e fetch-el, axios nem müxik
   const response = await fetch('http://localhost:5050/api/auth/refresh-token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
   })
   // Lejárt a refreshToken
   if (response.status === 403 || response.status === 401) {
      let redirectResponse = NextResponse.redirect(new URL('/login', request.url))
      redirectResponse.cookies.delete('accessToken')
      redirectResponse.cookies.delete('refreshToken')
      return redirectResponse
   }
   const newAccessToken = await response.json()

   const nextResponse = NextResponse.next()

   nextResponse.cookies.set({
      name: 'accessToken',
      value: newAccessToken,
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 60000),
   })
   return nextResponse
}

export const config = {
   matcher: ['/'],
}

/**
 * A middleware a request és a böngésző közti szakaszon hívódik meg
 *
 */
