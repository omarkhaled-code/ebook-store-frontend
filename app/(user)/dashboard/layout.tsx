import React from 'react'
import Link from 'next/link'
import SideNav from '@/components/ui/SideNav'

// هذه الروابط يمكنك لاحقاً استيرادها من ملف الـ Config الذي أنشأناه
const dashboardLinks = [
    { label: 'My Purchases', href: '/dashboard/purchases' },
    { label: 'My Ebooks', href: '/dashboard/ebooks' },
    { label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-surface-container-lowest"> {/* 👈 use your design system color */}
            <SideNav />
            <main className="flex-1 p-8 ml-0 md:ml-64"> {/* 👈 ml-0 on mobile, ml-64 on desktop */}

                {children}

            </main>
        </div>
    )
}