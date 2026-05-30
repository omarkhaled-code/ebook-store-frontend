'use client'

import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

// Map routes to page titles
const pageTitles: Record<string, string> = {
  '/dashboard':           'Dashboard',
  '/dashboard/purchases': 'My Library',
  '/dashboard/orders':    'Orders',
  '/dashboard/settings':  'Settings',
  '/dashboard/support':   'Support',
}

export default function DashboardHeader() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const pageTitle = pageTitles[pathname] || 'Dashboard'

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

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
            notifications
          </span>
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

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

      </div>
    </header>
  )
}