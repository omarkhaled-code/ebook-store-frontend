import React from 'react'
import Link from 'next/link'
import SideNav from '@/components/dashboard/SideNav'
import BottomNav from '@/components/dashboard/BottomNav'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

// هذه الروابط يمكنك لاحقاً استيرادها من ملف الـ Config الذي أنشأناه
const dashboardLinks = [
    { label: 'My Purchases', href: '/dashboard/purchases' },
    { label: 'My Ebooks', href: '/dashboard/ebooks' },
    { label: 'Settings', href: '/dashboard/settings' },
]
    
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-surface-container-lowest">

            {/* Sidebar — desktop only */}
            <SideNav />

            {/* Right side — header + content */}
            <div className="flex-1 flex flex-col ml-0 md:ml-64">

                {/* Header — always visible */}
                <DashboardHeader />

                {/* Page content */}
                <main className="flex-1 p-lg pb-24 md:pb-lg">
                    {children}
                </main>

            </div>

            {/* Bottom nav — mobile only */}
            <BottomNav />
        </div>
    )
}