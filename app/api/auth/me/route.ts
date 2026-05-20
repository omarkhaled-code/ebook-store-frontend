import { NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function GET() {
  const res = await laravelFetch('/auth/me')

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}