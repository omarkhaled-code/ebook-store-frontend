import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await laravelFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  // Store token in httpOnly cookie
  const response = NextResponse.json({
    message: data.message,
    user: data.user,
  })

  response.cookies.set('auth_token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return response
}