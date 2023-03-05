import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   // return NextResponse.redirect(new URL('/about-2', request.url))
   const refreshToken = request.cookies.get('refreshToken')?.value
   if (!refreshToken) return NextResponse.redirect(new URL('/login', request.url))
   //  Ha van access token megnézem, hogy valid-e axios-szal
   const response = await fetch('http://localhost:5050/api/auth/refresh-token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
   })
   // Lejárt a refreshToken
   if (response.status === 403) return NextResponse.redirect(new URL('/login', request.url))
   const newAccessToken = await response.json()
   // console.log(newAccessToken)
   return NextResponse.next()
}

export const config = {
   matcher: ['/'],
}

/**
 * A middleware a request és a böngésző közti szakaszon hívódik meg
 *
 */
