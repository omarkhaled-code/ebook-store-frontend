import { NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function POST() {
  // Tell Laravel to revoke the token
  await laravelFetch('/auth/logout', {
    method: 'POST',
  })

  // Delete the cookie
  const response = NextResponse.json({
    message: 'Logged out successfully.',
  })

  response.cookies.delete('auth_token')

  return response
}