export type User = {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}

export type AuthResponse = {
  message: string
  token: string
  user: User
}