import { NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function PATCH() {
  const res = await laravelFetch('/admin/notifications/read-all', {
    method: 'PATCH',
  })

  const data = await res.json()
  if (!res.ok) return NextResponse.json(data, { status: res.status })
  return NextResponse.json(data)
}