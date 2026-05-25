'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function Register({ changeMode }) {
  const { setUser } = useAuthStore()
  const router = useRouter()

  // =========================
  // States
  // =========================
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
  })

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

    // clear validation error on typing
    setValidationErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  // =========================
  // Validate Form
  // =========================
  const validateForm = () => {

    const errors = {
      name: '',
      email: '',
      password: '',
    }

    // Name
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = 'Invalid email format'
    }

    // Password
    if (!formData.password.trim()) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }

    setValidationErrors(errors)

    return !errors.name && !errors.email && !errors.password
  }

  // =========================
  // Handle Submit
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const isValid = validateForm()
    if (!isValid) return

    setLoading(true)

    try {

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.message || 'Registration failed')
      }

      // 👈 Save user to Zustand
      setUser(data.user)

      // 👈 Redirect to verify email page — not dashboard!
      router.refresh()
      router.push('/auth/verify-email')

      

    } catch (err) {

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong')
      }

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
              Get Started
            </h2>
            <p className="font-body-sm text-on-surface-variant">
              Create an account to start your collection.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-md" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Full Name
              </label>

              <input
                name="name"
                type="text"
                placeholder="Alex Rivers"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full pl-4 pr-4 py-3 bg-surface-container-low border rounded-lg outline-none transition-all
                ${validationErrors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-outline-variant focus:ring-primary/10 focus:border-primary'
                  }`}
              />

              {validationErrors.name && (
                <p className="text-[11px] text-red-500 mt-1">
                  {validationErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="alex@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-4 pr-4 py-3 bg-surface-container-low border rounded-lg outline-none transition-all
                ${validationErrors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-outline-variant focus:ring-primary/10 focus:border-primary'
                  }`}
              />

              {validationErrors.email && (
                <p className="text-[11px] text-red-500 mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Password
              </label>

              <div className="relative">

                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-4 pr-12 py-3 bg-surface-container-low border rounded-lg outline-none transition-all
                  ${validationErrors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-outline-variant focus:ring-primary/10 focus:border-primary'
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>

              </div>

              {validationErrors.password && (
                <p className="text-[11px] text-red-500 mt-1">
                  {validationErrors.password}
                </p>
              )}

            </div>

            {/* API Error */}
            {error && (
              <p className="text-red-500 text-center font-body-sm">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-semibold bg-primary text-on-primary flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Creating account...' : 'Create Account'}

              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>

          </form>

          {/* Switch */}
          <p className="text-center text-sm text-on-surface-variant">
            Already have an account?
            <button
              onClick={() => changeMode('login')}
              className="text-primary hover:underline ml-1"
            >
              Sign In
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}