'use client'

import { usePathname } from 'next/navigation'
import { User } from '@/types/user'

const pageTitles: Record<string, string> = {
  '/admin':              'Overview',
  '/admin/ebooks':       'Manage Ebooks',
  '/admin/ebooks/new':   'Upload New Ebook',
  '/admin/orders':       'All Orders',
}

export default function AdminHeader({ user }: { user: User }) {
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] || 'Admin'

  return (
    <header className="sticky top-0 z-30 bg-surface-container-low border-b border-outline-variant/30 px-lg py-md flex items-center justify-between">
      <div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          {pageTitle}
        </h2>
        <p className="font-body-sm text-[12px] text-on-surface-variant hidden md:block">
          Admin / {pageTitle}
        </p>
      </div>

      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-headline-sm text-primary font-bold uppercase text-[14px]">
            {user?.name?.charAt(0) || 'A'}
          </span>
        </div>
        <div className="hidden lg:block">
          <p className="font-body-sm text-on-surface font-semibold leading-tight">
            {user?.name}
          </p>
          <p className="font-body-sm text-[11px] text-primary font-semibold">
            Administrator
          </p>
        </div>
      </div>
    </header>
  )
}