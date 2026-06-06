import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function PUT(request: NextRequest) {
  const body = await request.json()

  const res = await laravelFetch('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}