import { cookies } from 'next/headers'

const LARAVEL_URL = process.env.LARAVEL_API_URL

export async function laravelFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${LARAVEL_URL}${endpoint}`, {
    ...options,
    headers,
  })

  return response
}