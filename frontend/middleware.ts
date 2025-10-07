import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
   const refreshToken = request.cookies.get('refreshToken')?.value
   /**
    * Próba: Küldök egy requestet a backend felé, hogy hogy be tudjam állítani a next.js backendjében a cookiekat
    * A middleware a next.js backendjén fut le, ezért nem látom a böngészőben lévő cookikat.
    * Mert a kommunikáció az expres.js backend és next.js fornted (AXIOS) között zajlik le.
    * A middleware nek fogalma sincs a böngészőben lévő cookiekról.
    *
    */

   if (!refreshToken) {
      //  Ha van refresh token megnézem, hogy valid-e fetch-el, axios nem müxik
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROD_API_URL}auth/check-refresh-token`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
      })
      if (response.status === 403) {
         let redirectResponse = NextResponse.redirect(new URL('/login', request.url))
         redirectResponse.cookies.delete('accessToken')
         redirectResponse.cookies.delete('refreshToken')
         return redirectResponse
      }
   }

   return NextResponse.next()
}

// Itt tudom a route-okat hozzáadni -> mire legyen érvényes
export const config = {
   matcher: ['/', '/friends', '/groups', '/me'],
}
