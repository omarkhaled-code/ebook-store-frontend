import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const res = await laravelFetch(`/admin/ebooks/${id}/toggle-publish`, {
    method: 'PATCH',
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}