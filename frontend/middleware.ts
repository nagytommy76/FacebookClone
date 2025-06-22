import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authRoutes = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const refreshToken = request.cookies.get('refreshToken')?.value
   if (!refreshToken) return NextResponse.redirect(new URL('/login', request.url))

   const nextUrl = request.nextUrl
   const isAuthRoute = authRoutes.includes(nextUrl.pathname)

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

   if (refreshToken) {
      if (isAuthRoute) return Response.redirect(new URL('/', nextUrl))
      return
   }
   return NextResponse.next()
}

// Itt tudom a route-okat hozzáadni -> mire legyen érvényes
// export const config = {
//    matcher: ['/', /*'/friends',*/ '/groups', '/me'],
// }
export const config = {
   matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
   ],
}
