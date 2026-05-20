import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { order_id } = body

  const res = await laravelFetch(`/downloads/generate/${order_id}`, {
    method: 'POST',
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}