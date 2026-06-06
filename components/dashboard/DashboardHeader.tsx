'use client'

import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

// Map routes to page titles
const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/purchases': 'My Library',
  '/dashboard/orders': 'Orders',
  '/dashboard/settings': 'Settings',
  '/dashboard/support': 'Support',
}

export default function DashboardHeader() {
  const pathname = usePathname()
  const { user, clearAuth } = useAuthStore()

  const pageTitle = pageTitles[pathname] || 'Dashboard'

  const router = useRouter()

  const handleLogout = async () => {

    const res = await fetch('/api/auth/logout', {
      method: "POST"
    })
    if (res.ok) {
      clearAuth()
      router.push('/auth')
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-surface-container-low border-b border-outline-variant/30 px-lg py-sm flex items-center justify-between">

      {/* Left — Page title */}
      <div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          {pageTitle}
        </h2>
        {/* Breadcrumb on desktop */}
        <p className="font-body-sm text-on-surface-variant text-[12px] hidden md:block">
          LuminaBooks / {pageTitle}
        </p>
      </div>

      {/* Right — User info + notifications */}
      <div className="flex items-center gap-md">

        {/* User avatar — desktop only */}
        <div className="hidden md:flex items-center gap-sm">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-headline-sm text-primary font-bold uppercase text-[14px]">
              {user?.name?.charAt(0) || '?'}
            </span>
          </div>
          <div className="hidden lg:block">
            <p className="font-body-sm text-on-surface font-semibold leading-tight">
              {user?.name || 'User'}
            </p>
            <p className="font-body-sm text-on-surface-variant text-[11px]">
              {user?.email}
            </p>
          </div>
        </div>
        <button className="cursor-pointer flex md:hidden hover:text-red-500 transition-colors duration-300" onClick={handleLogout}>
          <span className="material-symbols-outlined">
            logout
          </span>
        </button>

      </div>
    </header>
  )
}