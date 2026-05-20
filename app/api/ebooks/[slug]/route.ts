import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const res = await laravelFetch(`/ebooks/${slug}`)
  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}