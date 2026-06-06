import { NextRequest, NextResponse } from 'next/server'
import { laravelFetch } from '@/lib/laravel'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  const res = await laravelFetch(`/downloads/${token}`)

  if (!res.ok) {
    // 👈 Return JSON error instead of exposing Laravel exception
    return NextResponse.json({
      message: 'Download failed. The file may not be available.'
    }, { status: res.status })
  }

  const blob = await res.blob()
  const contentDisposition = res.headers.get('content-disposition')

  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': contentDisposition || 'attachment; filename="ebook.pdf"',
    },
  })
}