import { NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function POST() {
  const res = await laravelFetch('/auth/resend-verification', {
    method: 'POST',
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}