import React from 'react'
import { cookies } from 'next/headers'
import { laravelFetch } from '@/lib/laravel'
import SideNav from '@/components/dashboard/SideNav'
import BottomNav from '@/components/dashboard/BottomNav'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ExpiredSession from '@/components/auth/ExpiredSession'


// Check if user is admin on server side
async function getUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return null

    const res = await laravelFetch('/auth/me')
    if (!res.ok) return null

    const data = await res.json()
    return data.user
}


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const user = await getUser()

    // Not logged in → redirect to login
    if (!user) {
        return <ExpiredSession/>
    }


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