'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'

export default function VerifyEmailPage() {
    const { user } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleResend = async () => {
        setLoading(true)
        setMessage('')
        setError('')

        try {
            const res = await fetch('/api/auth/resend-verification', {
                method: 'POST',
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.message)
            setMessage('Verification email sent! Check your inbox.')

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <main className="flex-grow flex items-center justify-center px-gutter pt-32 pb-16">
                <div className="w-full max-w-2xl">
                    {/* <!-- Focused Card Component --> */}
                    <div
                        className="premium-card bg-surface-container-lowest rounded-xl p-xl text-center transition-transform hover:scale-[1.01] duration-300">
                        {/* <!-- Brand Anchor Icon --> */}
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/10 mb-lg ring-8 ring-primary-container/5">
                            <span className="material-symbols-outlined text-[40px] text-primary"
                                style={{ fontVariationSettings: "'FILL' 1" }}>
                                mark_email_read
                            </span>
                        </div>
                        {/* <!-- Text Content --> */}
                        <h1 className="font-headline-md text-headline-md text-on-surface mb-sm">
                            Check your inbox
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-lg px-2">
                            We've sent a verification link to <span
                                className="font-semibold text-on-surface">{user?.email}</span>. Please click the link to
                            confirm your account and start building your library.
                        </p>

                        {/* Error Message */}
                        {/* Success/Error messages */}
                        <div className="mb-lg">
                            {message && (
                                <p className="text-green-600 font-body-sm bg-green-50 p-sm rounded-lg">
                                    {message}
                                </p>
                            )}
                            {error && (
                                <p className="text-red-500 font-body-sm">
                                    {error}
                                </p>
                            )}
                        </div>
                        {/* <!-- Actions --> */}
                        <div className="space-y-md">

                            <Link href="/ebooks" className="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold py-4 rounded-lg shadow-md hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-xs">
                                Browse ebooks while you wait →
                            </Link>
                            <div className="pt-sm flex">
                                <button
                                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-black transition-colors flex items-center justify-center gap-xs mx-auto cursor-pointer"
                                    onClick={handleResend}
                                    disabled={loading}>
                                    Didn't receive the email?
                                    <span
                                        className="text-primary font-semibold underline underline-offset-4 decoration-primary-container/30 hover:decoration-primary">
                                        {loading ? 'Sending...' : 'Resend verification email'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Footer Task-Focused Link --> */}
                    {/* <div className="mt-lg text-center">
                        <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors flex items-center justify-center gap-xs"
                            href="#">
                            <span className="material-symbols-outlined text-[18px]">help_outline</span>
                            Need help? Contact support
                        </a>
                    </div> */}
                </div>
            </main>
        </>

    )
}