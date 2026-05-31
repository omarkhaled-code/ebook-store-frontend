import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const res = await laravelFetch(`/admin/ebooks/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json({ message: 'Ebook deleted successfully.' })
}