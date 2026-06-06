import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  // Get form data — files need special handling
  const formData = await request.formData()

  const res = await fetch(`${process.env.LARAVEL_API_URL}/admin/ebooks`, {
    method: 'POST',
    headers: {
      // Don't set Content-Type — browser sets it with boundary for multipart
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: formData, // 👈 pass formData directly
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data, { status: 201 })
}