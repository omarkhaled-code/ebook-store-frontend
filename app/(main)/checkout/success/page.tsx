'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const toast = useToast()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  const success = searchParams.get('success')
  const pending = searchParams.get('pending')
  const message = searchParams.get('data.message')

  useEffect(() => {
    // success=true AND pending=false = real success
    if (success === 'true' && pending === 'false') {
      setStatus('success')
      toast.success('Payment completed successfully! 🎉')
    } else {
      setStatus('failed')
      toast.error(message || 'Payment failed. Please try again.')
    }
  }, [])

  if (status === 'loading') {
    return (
      <main className="flex-grow flex items-center justify-center pt-32">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  if (status === 'failed') {
    return (
      <main className="flex-grow flex items-center justify-center px-gutter pt-32 pb-16">
        <div className="w-full max-w-2xl">
          <div className="bg-surface-container-lowest rounded-xl p-xl text-center border border-outline-variant shadow-xl">

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-lg ring-8 ring-red-50">
              <span
                className="material-symbols-outlined text-[40px] text-red-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                cancel
              </span>
            </div>

            <h1 className="font-headline-md text-headline-md text-on-surface mb-sm">
              Payment Failed
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              {message || 'Something went wrong with your payment. Please try again.'}
            </p>

            <div className="space-y-sm">
              <Link
                href="/ebooks"
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-sm flex items-center justify-center gap-xs shadow-lg"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Ebooks
              </Link>
            </div>

          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-grow flex items-center justify-center px-gutter pt-32 pb-16">
      <div className="w-full max-w-2xl">
        <div className="bg-surface-container-lowest rounded-xl p-xl text-center border border-outline-variant shadow-xl">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-lg ring-8 ring-green-50">
            <span
              className="material-symbols-outlined text-[40px] text-green-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <h1 className="font-headline-md text-headline-md text-on-surface mb-sm">
            Payment Successful! 🎉
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
            Your ebook is now available in your dashboard.
          </p>

          <div className="space-y-sm">
            <Link
              href="/dashboard/purchases"
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-sm flex items-center justify-center gap-xs shadow-lg"
            >
              <span className="material-symbols-outlined">library_books</span>
              Go to My Purchases
            </Link>

            <Link
              href="/ebooks"
              className="w-full bg-surface border border-outline-variant text-on-surface py-4 rounded-xl font-headline-sm flex items-center justify-center gap-xs"
            >
              Browse More Ebooks
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}