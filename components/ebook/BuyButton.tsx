'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/useToast'

interface Props {
  ebookId: number
  price: number
}

export default function BuyButton({ ebookId, price }: Props) {
  const { user, isAuthenticated } = useAuthStore()
  const toast = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {

    // ❌ Not logged in
    if (!isAuthenticated) {
      toast.warning('Please log in to purchase ebooks!')
      router.push('/auth')
      return
    }

    // ❌ Not verified
    if (!user?.email_verified_at) {
      toast.warning('Please verify your email before purchasing!')
      router.push('/verify-email')
      return
    }

    setLoading(true)

    try {
      // Step 1 — Create order
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ebook_id: ebookId }),
      })

      const orderData = await orderRes.json()

      // ❌ Already purchased
      if (orderRes.status === 409) {
        toast.info('You already purchased this ebook!')
        router.push('/dashboard/purchases')
        return
      }

      if (!orderRes.ok) {
        throw new Error(orderData.message || 'Failed to create order')
      }

      // Step 2 — Initiate payment
      toast.info('Redirecting to payment...')

      const paymentRes = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderData.data.order_id }),
      })

      const paymentData = await paymentRes.json()

      if (!paymentRes.ok) {
        throw new Error(paymentData.message || 'Payment initiation failed')
      }

      // Step 3 — Redirect to Paymob
      window.location.href = paymentData.iframe_url

    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="bg-primary text-on-primary px-8 md:px-xl py-3 md:py-4 rounded-xl font-headline-sm text-lg md:text-headline-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 w-full md:w-auto"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Processing...
        </>
      ) : (
        <>
          Buy Now — ${price}
          <span className="material-symbols-outlined">arrow_forward</span>
        </>
      )}
    </button>
  )
}