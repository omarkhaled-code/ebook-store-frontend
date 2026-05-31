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
        /* هنشيل overflow-x-hidden من هنا ونحطها في الـ main */
        <div className="min-h-screen bg-surface-container-lowest flex">
            
            {/* 1. القائمة الجانبية (ثابتة في الشاشات الكبيرة) */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <SideNav />
            </div>

            {/* 2. المحتوى الرئيسي (هياخد المساحة الباقية) */}
            {/* flex-1 دي بتخليه ياخد كل المساحة المتبقية من غير ما يحتاج margin */}
            <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
                
                <DashboardHeader />

                {/* المحتوى الفعلي */}
                <div className="flex-1 p-lg pb-24 md:pb-lg">
                    {children}
                </div>
            </main>

            {/* 3. القائمة السفلية (موبايل فقط) */}
            <div className="md:hidden">
                <BottomNav />
            </div>

        </div>
    )
}