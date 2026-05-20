import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await laravelFetch('/payments/initiate', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}