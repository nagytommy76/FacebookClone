import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const refreshToken = request.cookies.get('refreshToken')?.value
   if (!refreshToken) return NextResponse.redirect(new URL('/login', request.url))
   //  Ha van refresh token megnézem, hogy valid-e fetch-el, axios nem müxik
   const response = await fetch('http://localhost:5050/api/auth/refresh-token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ refreshToken }),
   })
   // // Lejárt a refreshToken
   if (response.status === 403) {
      let redirectResponse = NextResponse.redirect(new URL('/login', request.url))
      redirectResponse.cookies.delete('accessToken')
      redirectResponse.cookies.delete('refreshToken')
      return redirectResponse
   }
   NextResponse.next()
}

export const config = {
   matcher: ['/'],
}

/**
 * Atküldeni backendről egy accessTokenExpiresIn stringet/millisecet, hogy itt is szinkronban legyen a cookie
 * Átküldeni az accessTokent, ha az érvényes minden ok, ha nem a refreshTokent megnézni,hogy érvényes-e,
 * ha igen igényelni egy új accessTokent, ha az sem kiléptetni a usert
 *
 * Valahogy ki kéne deríteni, hogy a login-ról jövök, akkor ne fusson le
 *
 */
