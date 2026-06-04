import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function GET(request: NextRequest) {
  // Forward any query params like ?page=2
  const searchParams = request.nextUrl.searchParams.toString()
  const endpoint = searchParams ? `/ebooks/featured?${searchParams}` : '/ebooks/featured'

  const res = await laravelFetch(endpoint)
  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}