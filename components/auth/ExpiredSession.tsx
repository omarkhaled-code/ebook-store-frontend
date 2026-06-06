import Link from 'next/link'
import React from 'react'

export default function ExpiredSession() {
    return (
        <main className="flex-grow flex items-center justify-center px-gutter pt-24 pb-xl">
            <div className="max-w-[560px] w-full text-center space-y-lg">
                {/* <!-- Context Icon --> */}
                <div className="flex justify-center">
                    <div
                        className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-primary glow-icon">
                        <span className="material-symbols-outlined text-[40px]" data-icon="history">history</span>
                    </div>
                </div>
                {/* <!-- Content Group --> */}
                <div className="space-y-md">
                    <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Your session has expired</h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant px-4">
                        For your security, your login session is no longer valid. This can happen if you've been inactive
                        for a while, logged out from another device, or if your account access has changed.
                    </p>
                </div>
                {/* <!-- Action Buttons --> */}
                <div className="flex flex-col sm:flex-row gap-sm justify-center items-center pt-md">
                    <Link href="/auth">
                        <button
                            className="w-full sm:w-auto px-lg h-14 bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm flex items-center justify-center gap-xs hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20  cursor-pointer">
                            <span className="material-symbols-outlined" data-icon="login">login</span>
                            Sign In Again
                        </button>
                    </Link>
                    <Link href="/">
                        <button
                            className="w-full sm:w-auto px-lg h-14 bg-transparent border-2 border-outline-variant text-on-surface font-headline-sm text-headline-sm rounded-lg hover:bg-surface-container-low active:scale-95 transition-all cursor-pointer">
                            Go to Home
                        </button>
                    </Link>
                </div>
                {/* <!-- Subtle Note --> */}
                <div className="flex items-center justify-center gap-xs text-outline pt-sm">
                    <span className="material-symbols-outlined text-sm" data-icon="info">info</span>
                    <p className="font-body-sm text-body-sm">Any unsaved changes may need to be re-entered after you sign back
                        in.</p>
                </div>
            </div>
        </main>
    )
}
