'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'

export default function VerifiedPage() {
  const { setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch fresh user data from server to update Zustand
    const refreshUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()

        if (res.ok && data.user) {
          setUser(data.user) // 👈 update Zustand with verified user
        }
      } catch (err) {
        console.error('Failed to refresh user', err)
      } finally {
        setLoading(false)
      }
    }

    refreshUser()
  }, [])

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main className="flex-grow flex items-center justify-center px-gutter pt-32 pb-16">
      <div className="w-full max-w-2xl">
        <div className="bg-surface-container-lowest rounded-xl p-xl text-center">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-lg ring-8 ring-green-50">
            <span
              className="material-symbols-outlined text-[40px] text-green-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>

          <h1 className="font-headline-md text-headline-md text-on-surface mb-sm">
            Email Verified! 🎉
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg px-2">
            Your email has been verified successfully.
            You can now purchase ebooks!
          </p>

          <Link
            href="/"
            className="w-full bg-primary text-on-primary font-body-md font-semibold py-4 rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-xs"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Go to Home
          </Link>

        </div>
      </div>
    </main>
  )
}