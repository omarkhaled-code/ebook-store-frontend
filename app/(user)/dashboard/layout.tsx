import React from 'react'
import Link from 'next/link'

// هذه الروابط يمكنك لاحقاً استيرادها من ملف الـ Config الذي أنشأناه
const dashboardLinks = [
    { label: 'My Purchases', href: '/dashboard/purchases' },
    { label: 'My Ebooks', href: '/dashboard/ebooks' },
    { label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar الجانبي */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-8 text-green-600">Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    {dashboardLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {/* زر العودة للمتجر */}
                    <hr className="my-4" />
                    <Link href="/" className="text-gray-500 hover:text-black text-sm">
                        ← Back to Store
                    </Link>
                </nav>
            </aside>

            {/* المحتوى الرئيسي */}
            <main className="flex-1 p-8">
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                    {children}
                </div>
            </main>
        </div>
    )
}