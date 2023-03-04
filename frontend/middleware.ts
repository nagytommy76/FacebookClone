import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { axiosInstance as axios } from './axiosSetup/AxiosInstance'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   // return NextResponse.redirect(new URL('/about-2', request.url))
   const refreshToken = request.cookies.get('refreshToken')?.value
   const accessToken = request.cookies.get('accessToken')?.value
   if (!accessToken && !refreshToken) return NextResponse.redirect(new URL('/login', request.url))

   return NextResponse.next()
}

export const config = {
   matcher: ['/main'],
}

/**
 * A middleware a request és a böngésző közti szakaszon hívódik meg
 *
 */
