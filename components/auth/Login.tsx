
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SocialLogin from "./SocialLogin"

export default function Login({ changeMode }) {

  const router = useRouter()

  // =========================
  // States
  // =========================
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // =========================
  // Handle Input Changes
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // =========================
  // Handle Submit
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      // Handle API Errors
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Success
      console.log('User:', data.user)

      // Redirect
      router.push('/dashboard')

    } catch (err) {

      setError(err.message)

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="lg:col-span-5 flex justify-center">

      <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-xl relative overflow-hidden">

        <div className="relative z-10 space-y-md">

          {/* Header */}
          <div>
            <h2 className="font-headline-md text-headline-md">
              Sign In
            </h2>

            <p className="font-body-sm text-on-surface-variant hidden lg:block">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-md"
            onSubmit={handleSubmit}
          >

            {/* Email */}
            <div className="space-y-xs">

              <label
                htmlFor="email"
                className="font-body-sm font-medium text-on-surface"
              >
                Email Address
              </label>

              <div className="relative">

                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
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
                  required
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none"
                />

              </div>
            </div>

            {/* Password */}
            <div className="space-y-xs">

              <label
                htmlFor="password"
                className="font-body-sm font-medium text-on-surface"
              >
                Password
              </label>

              <div className="relative">

                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
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
                  required
                  className="w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none"
                />

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

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-semibold bg-primary text-on-primary active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >

              {loading ? 'Logging in...' : 'Login'}

              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>

            </button>

          </form>

          {/* <!-- Divider --> */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px bg-outline-variant flex-grow"></div>
            <span className="font-label-mono text-label-mono text-outline-variant">OR</span>
            <div className="h-px bg-outline-variant flex-grow"></div>
          </div>
          {/* <!-- Social Sign Up --> */}
          <SocialLogin />

          {/* Footer */}
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