import { NextRequest, NextResponse } from 'next/server'

// Routes that require login
const protectedRoutes = [
  '/dashboard',
  '/checkout',
]

// Routes only for guests (logged in users shouldn't see these)
const guestOnlyRoutes = [
  '/auth',
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const pathname = request.nextUrl.pathname

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Check if route is guest only
  const isGuestOnlyRoute = guestOnlyRoutes.some(route =>
    pathname.startsWith(route)
  )

  // ❌ Not logged in + trying to access protected route
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('redirect', pathname) // 👈 remember where they wanted to go
    return NextResponse.redirect(loginUrl)
  }

  // ❌ Already logged in + trying to access login/register page
  if (isGuestOnlyRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Tell Next.js which routes middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/checkout/:path*',
    '/auth/:path*',
  ]
}