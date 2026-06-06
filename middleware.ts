import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/checkout',
]

const adminRoutes = [
  '/admin',
]

const guestOnlyRoutes = [
  '/auth',
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const pathname = request.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some(r => pathname.startsWith(r))
  const isAdminRoute = adminRoutes.some(r => pathname.startsWith(r))
  const isGuestOnlyRoute = guestOnlyRoutes.some(r => pathname.startsWith(r))

  // Not logged in + protected route
  if ((isProtectedRoute || isAdminRoute) && !token) {
    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Logged in + guest only route
  if (isGuestOnlyRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/checkout/:path*',
    '/auth/:path*',
    '/admin/:path*',
  ]
}