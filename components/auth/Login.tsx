'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SocialLogin from "./SocialLogin"
import { useAuthStore } from '@/store/authStore'

// 👈 Separate inner component
function LoginForm({ changeMode }: { changeMode: (mode: string) => void }) {

  const router = useRouter()
  const { setUser } = useAuthStore()
  const searchParams = useSearchParams() // 👈 moved to TOP LEVEL

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const errors = { email: '', password: '' }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setValidationErrors(errors)
    return !errors.email && !errors.password
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const isValid = validateForm()
    if (!isValid) return

    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.message || 'Login failed')
      }

      setUser(data.user)

      // 👈 read redirect param — already available from top level
      const redirectTo = searchParams.get('redirect') || '/'
      router.refresh()
      router.push(redirectTo)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg:col-span-5 flex justify-center">
      <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-md">

          <div>
            <h2 className="font-headline-md text-headline-md">Sign In</h2>
            <p className="font-body-sm text-on-surface-variant hidden lg:block">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-md" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="space-y-xs">
              <label htmlFor="email" className="font-body-sm font-medium text-on-surface">
                Email Address
              </label>
              <div className="relative">
                <span className={`material-symbols-outlined absolute left-3 -translate-y-1/2 text-outline-variant ${validationErrors.email ? 'text-red-500 top-1/3' : 'top-1/2'}`}>
                  mail
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-surface-container-low border rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none ${validationErrors.email ? 'border-red-500 focus:ring-red-100 focus:border-red-500' : 'border-outline-variant'}`}
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500 pt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <label htmlFor="password" className="font-body-sm font-medium text-on-surface">
                Password
              </label>
              <div className="relative">
                <span className={`material-symbols-outlined absolute left-3 -translate-y-1/2 text-outline-variant ${validationErrors.password ? 'text-red-500 top-1/3' : 'top-1/2'}`}>
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-surface-container-low border rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none ${validationErrors.password ? 'border-red-500 focus:ring-red-100 focus:border-red-500' : 'border-outline-variant'}`}
                />
                {validationErrors.password && (
                  <p className="text-sm text-red-500 pt-1">{validationErrors.password}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-center font-body-sm">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-semibold bg-primary text-on-primary active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

          </form>

          <div className="flex items-center gap-3 py-2">
            <div className="h-px bg-outline-variant flex-grow"></div>
            <span className="font-label-mono text-label-mono text-outline-variant">OR</span>
            <div className="h-px bg-outline-variant flex-grow"></div>
          </div>

          <SocialLogin />

          <p className="text-center font-body-sm text-on-surface-variant pt-2">
            Don't have an account?
            <button
              type="button"
              onClick={() => changeMode('register')}
              className="text-primary hover:underline ml-1"
            >
              Sign Up
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}

// 👈 Wrap in Suspense — required for useSearchParams in Next.js 15
export default function Login({ changeMode }: { changeMode: (mode: string) => void }) {
  return (
    <Suspense fallback={null}>
      <LoginForm changeMode={changeMode} />
    </Suspense>
  )
}